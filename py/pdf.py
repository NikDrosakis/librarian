# import os
# from pdfrw import PdfReader
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
import os

file_name ='/var/www/aimd5.com/apps/bks/pdf/AIwithPython.pdf'
fp = open(file_name, 'rb')
parser = PDFParser(fp)
doc = PDFDocument(parser)
fp.close()
metadata = doc.info  # The "Info" metadata
print (metadata)
