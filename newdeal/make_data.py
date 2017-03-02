import json

months = [m.lower() for m in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']]

def parse_date(date):
	year = date.split(", ")[1]
	day = date.split(" ")[1].split(",")[0]
	month = months.index(date.split(" ")[0].lower())+1
	return (int(year), int(month), int(day))

with open("doc.txt", 'r') as fin:
	with open("data.js", 'w') as fout:
		lines=fin.readlines()
		data=[]
		for idx, (line1, line2) in enumerate(zip(lines[0::2], lines[1::2])):
			start_date = line1.split("(")[1].split("-")[0].rstrip().strip()
			start = parse_date(start_date)
			if "->" in line1:
				end_date=line1.split("-> ")[1].split(" -")[0]
				end=parse_date(end_date)
			else:
				end=""
			title = line1.split("-")[0].rstrip().strip()
			tags = [i for i in ["relief", "recovery", "reform"] if i in line1.lower()]
			for tag in tags:
				title+='<span class="title-tag tag-'+tag+'" title="'+tag.capitalize()+'">R</span>'
			longtitle = line1.split("- ")[1].split(" (")[0]
			body="<div class=\"modal\"><h3>"+title+"</h3><br/><i>"+longtitle+"</i> : "+start_date+(" - "+end_date if end else " - present")+" <hr/>"+line2+"</div>"
			# print(body)
			data.append({
				"id":idx,
				"content":title,
				"start":"%04i-%02i-%02i"%start,
				"end":("%04i-%02i-%02i"%end) if end else "",
				"tags":tags,
				"body":body,
				"type":"range" if end else "point"
			})
		fout.write("document.newDealData=")
		fout.write(json.dumps(data))
		fout.write(";")