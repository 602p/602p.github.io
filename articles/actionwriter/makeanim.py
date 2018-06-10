import os
clear = lambda:os.system("clear")
printn = lambda *a,**k: print(*a, **k, end="")

def print_matrix(pressed=(), selected_col=-1):
	for col in range(4):
		printn("ABCD"[col] if col==selected_col else "abcd"[col])
		printn("  ")
	printn("\n")
	for col in range(4):
		printn("|")
		printn("  ")
	printn("\n")
	for row in range(4):
		for col in range(4):
			if (row, col) in pressed:
				printn("X")
			else:
				printn("O")
			printn("--")
		printn(" ")
		printn(str(row))
		if any((row, t) in pressed and t==selected_col for t in range(4)):
			printn(" HIGH")
		printn("\n")
		if row!=3:
			for _ in range(4):
				printn("|  ")
			printn("\n")

pressed=(
	(0, 1),
	(3, 3),
	(2, 3)
)

for i in range(4):
	print_matrix(pressed, i)
	print("\n--cut--\n")