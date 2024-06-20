import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePdf = fileName => () => {
  const input = document.getElementById('ticket')
  input.style.minWidth = '1400px'
  // eslint-disable-next-line promise/catch-or-return
  html2canvas(input)
    // eslint-disable-next-line promise/always-return
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`${fileName}.pdf`)
    })
    .catch(error => {
      console.error('Error generating PDF:', error)
    })
    .finally(() => {
      input.style.minWidth = 'auto'
    })
}
