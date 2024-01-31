BKS is a boostore application for desktop and mobile 
version 0.0.1
============
1) book new, edit,list
2) CAT page + DROP DOWN IN BOOK.PHP AND NEW.PHP + CAT ARCHIVE
3) EDITORS + DROP DOWN IN BOOK.PHP AND new book
4) WRITERS + DROP DOWN IN BOOK.PHP AND new book
5) MOD fimg - GOOGLE API SEARCH IMG AND SAVE
6) MOD finfo connect with writer  -GAIN AUTODATA 
7) categories and subcategories in mariadb
8) ASYNC LIST, BASIC SEARCH,search archive
9) UI improvement
10) PAGINATION
11) CREATE ARCHIEVE STYLE (BOXY)
- UPDATE PAGE (complete empty rows) for image auto-suggesion at empty img rows(like ask). 
- TAGGING (find a db schema to match like)
- PDF support 
TODO:
- localization (english)
- SUGGEST (4 from Writers, 3 from Subcategories) google writers and books suggestions
- android mobile (+upload photo)
- AI - recognize book (scan image)
- batch change 
- finfo 10 suggestions (4 of the writers, 3 of the title, 3 of subcategory)


SCHEMA
bks_book 
status 
0 lost
1 not owned
2 desired to buy
3 owned on shelve

isread switcher
0 notread (default)
1 read

format
1 hardcopy
2 digital
3 both

filename

TAGS

CATEGORIES
0 Social, Political and Human Sciences
1 History
2 Sciences
3 theatre (new greek, ancient greek, english, italian, french)
4 Πεζογραφία 
5 Philosophy (ancient greek, political)
6 Poetry (greek, other)
7 art (cinema, music, photography)
8 
9

quota exceeds
=================
This app uses Google Custom Search API and quota is limited. 
So we cannot provide a free app 
There is also Apache Lucene Core it needs JAVA
Check it tomorrow from Upvolume.
 http://lucene.apache.org/core/index.html
 https://archive.codeplex.com/?p=searcharoo
 




