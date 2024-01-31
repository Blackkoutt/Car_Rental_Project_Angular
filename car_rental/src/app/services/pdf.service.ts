import { Injectable } from "@angular/core";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { CarData } from "../models/car-data";

@Injectable({
  providedIn: "root"
})
export class PdfService {
  constructor() {}

  async generateCarReservationPdf(values: any): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSizeText = 13;
    const fontSizeHeader = 15;

    page.drawText(`Potwierdzam rezerwacje samochodu:`, { x: 50, y: 800, font, size: fontSizeHeader });
    page.drawText(`${values.manufacturer} ${values.model}`, { x: 50, y: 780, font, size: fontSizeText });
    page.drawText(`w dniach:`, { x: 50, y: 750, font, size: fontSizeHeader });
    page.drawText(`${values.startDate} - ${values.endDate}`, { x: 50, y: 730, font, size: fontSizeText });
    page.drawText(`Oswiadczam, ze zapoznalem sie z regulaminem CarRental`, {
      x: 50,
      y: 680,
      font,
      size: fontSizeHeader
    });
    page.drawText("Podpis:", { x: 50, y: 660, font, size: fontSizeHeader });

    /* page.drawText(`Potwierdzam rezerwacje samochodu:`, { x: 50, y: 800 });
    page.drawText(`${values.manufacturer} ${values.model}`, { x: 50, y: 750 });
    page.drawText(`w dniach:`, { x: 50, y: 700 });
    page.drawText(`${values.startDate} - ${values.endDate}`, { x: 50, y: 650 });
    page.drawText(`O lacznym koszcie:`, { x: 50, y: 600 });
    page.drawText(`${values.total_cost}`, { x: 50, y: 550 });
    page.drawText(`Oswiadczam ze zapoznalem sie z regulaminem CarRental`, { x: 50, y: 500 });
    page.drawText("Podpis:", { x: 50, y: 450 });*/

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }
}
