import pygame, math, time

pygame.init()
screen = pygame.display.set_mode((250,450))
font = pygame.font.SysFont('monospace', 16)
font_lg = pygame.font.SysFont('monospace', 24, True)
font_sm = pygame.font.SysFont('monospace', 13)

def draw_mux(centerx, centery, state, offset, enabled):
	size=85
	color=(100,100,100) if not enabled else (0,0,255)
	startpos=(centerx-(size//2), centery)
	pygame.draw.circle(screen, (0,255,0) if enabled else (100,100,100), startpos, 5)
	screen.blit(font_sm.render("("+("0" if offset==0 else "1")+"xxx)", False, (200,200,200)), (centerx-(size//2)-20, centery+10))
	
	for i in range(8):
		angle=(180/16)+((180/8)*i)
		xcor = int(math.sin(math.radians(angle))*size) + centerx
		ycor = int(math.cos(math.radians(angle))*size) + centery
		pygame.draw.circle(screen, color if state!=i or not enabled else (0,255,0), (xcor, ycor), 5)
		screen.blit(font.render(str(i+offset), False, (200,200,200)), (xcor+10, ycor-10))
		screen.blit(font_sm.render("(x"+bpad(3,i)+")", False, (200,200,200)), (xcor+50, ycor-10))
		if i==state:
			pygame.draw.line(screen, (0,255,0) if enabled else (100,100,100), startpos, (xcor, ycor))

def bpad(n, i):
	b=bin(i)[2:]
	b=("0"*(n-len(b)))+b
	return b

i=0
run=True
while run:
	for e in pygame.event.get():
		if e.type==pygame.QUIT or (e.type==pygame.KEYDOWN and e.key==pygame.K_q): run = False
	screen.fill((20,20,20))
	j=i if i<8 else i-8
	draw_mux(60, 350, j, 0, i<8)
	draw_mux(60, 150, j, 8, i>=8)
	screen.blit(font_lg.render("Address: "+bpad(4, i)+" ("+str(i)+")", False, (200,200,200)), (0, 0))
	pygame.display.update()
	pygame.image.save(screen, str(i)+".png")
	time.sleep(0.2)
	i+=1
	if i==16:
		run=False