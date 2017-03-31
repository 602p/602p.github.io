import json
from collections import Counter

months = [m.lower() for m in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']]

def parse_date(date):
	things=Counter(date)[' ']
	year = date.split(" ")[-1]
	month=1
	day=1
	if things>1:
		month = months.index(date.split(" ")[1].lower())+1
		if things>2:
			day = date.split(" ")[0]
			
	return (int(year), int(month), int(day))

with open("dump.txt", 'r') as fin:
	with open("data.js", 'w') as fout:
		lines=fin.readlines()
		data=[]
		for idx, (line1, line2) in enumerate(zip(lines[0::2], lines[1::2])):
			print(line1, line2)
			title=line1.split(" - ")[0]
			start_date=line1.split(" - ")[1].split("-")[0]
			start=parse_date(start_date)
			end_date=line1.split(" - ")[1].split("-")[1] if "-" in line1.split(" - ")[1] else ""
			end=parse_date(end_date) if end_date else None
			body="<div class=\"modal\"><h3>"+title+"</h3><br/>"+start_date+(" - "+end_date if end else " - present")+" <hr/>"+line2+"</div>"
			# print(body)
			data.append({
				"id":idx,
				"content":title,
				"start":"%04i-%02i-%02i"%start,
				"end":("%04i-%02i-%02i"%end) if end else "",
				"body":body,
				"type":"range" if end else "point"
			})
		fout.write("document.cubaData=")
		fout.write(json.dumps(data))
		fout.write(";")