import './cockpit.css';
import { UseCreateCrudTableFor } from "../components/crud-table/crud-table";
import { Navbar } from "../components/navbar/navbar";
import { useDataAccess } from '../data-access/data-layer';
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

const invoiceProps = (student, plan) => {

  const invoiceNumber = prompt("Invoice number? ");

  return {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2023 " + student.id,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0 //negative or positive num, from the current position
      }
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0 //negative or positive num, from the current position
      }
    },
    business: {
      name: "Dojo Manager",
      address: "ACME INC Adress",
      phone: "(+49) 069 11 11 111",
      email: "panov@royalzsoftware.de",
      website: "https://royalzsoftware.de",
    },
    contact: {
      label: "Invoice issued for:",
      name: student.first_name + student.last_name,
      address: student.address,
    },
    invoice: {
      label: "Invoice #: ",
      num: invoiceNumber,
      invDate: "Payment Date: " + new Date().toISOString(),
      invGenDate: "Invoice Date: " + (new Date(Date.now() + 864000000)).toISOString(),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10
          }
        },
        {
          title: "Title",
          style: {
            width: 30
          }
        },
        {
          title: "Description",
          style: {
            width: 80
          }
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Total" }
      ],
      table: [[
        1,
        plan.name,
        plan.description ?? '',
        '$ ' + plan.pricing,
        1,
        '$' + plan.pricing,
      ]],
      additionalRows: [{
        col1: 'Total:',
        col2: '$ ' + Math.round((plan.pricing * 1.19) * 100) / 100,
        col3: 'ALL',
        style: {
          fontSize: 14 //optional, default 12
        }
      },
      {
        col1: 'VAT:',
        col2: '19',
        col3: '%',
        style: {
          fontSize: 10 //optional, default 12
        }
      },
      {
        col1: 'SubTotal:',
        col2: '$ ' + plan.pricing,
        col3: 'ALL',
        style: {
          fontSize: 10 //optional, default 12
        }
      }],
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  }
}

export function Cockpit() {
  const { studentsRepository, plansRepository } = useDataAccess();

  const printInvoiceAction = () => {
    return {
      label: 'Invoice',
      callback: async (student) => {
        if (student.plan == undefined) {
          alert("Student does not have a plan selected.");
          return;
        }

        const plan = (await plansRepository.get(student.plan));

        jsPDFInvoiceTemplate(invoiceProps(student, plan))
      }
    }
  }

  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>Cockpit</h1>
        <h3>Manage all your data in one place</h3>
      </header>
      <hr></hr>
      <main>
        <section>
          <header>
            <h2>Students</h2>
          </header>
          <UseCreateCrudTableFor
            repository={studentsRepository}
            additionalActions={[printInvoiceAction()]}
            headers={['id', 'first_name', 'last_name', 'pretty_plan']}
          ></UseCreateCrudTableFor>
        </section>
        <aside>
          <header>
            <h2>Plans</h2>
          </header>
          <UseCreateCrudTableFor
            query_field='name'
            repository={plansRepository}
            headers={['id', 'name', 'pricing']}
          ></UseCreateCrudTableFor>
        </aside>
      </main>
    </>
  );
}