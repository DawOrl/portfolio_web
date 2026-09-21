from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'public/Dawid_Orlowski_CV.pdf'
DEST = ROOT / 'output/pdf/Dawid_Orlowski_CV.pdf'
FONTS = Path('/Users/dawid/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name, filename in [('Body', 'Carlito-Regular.ttf'), ('BodyBold', 'Carlito-Bold.ttf'), ('Display', 'Rubik-Regular.ttf'), ('DisplayBold', 'Rubik-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))

W, H = 595.5, 842.25
INK, LIGHT, MUTED, WINE = '#2c2c2e', '#f8f7f5', '#66666b', '#a00c30'
DEST.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(DEST), pagesize=(W, H), pageCompression=1)
c.setTitle('Dawid Orłowski - Fullstack AI Developer')
c.setAuthor('Dawid Orłowski')
c.setSubject('CV - doświadczenie zawodowe i umiejętności')
c.setFillColor(HexColor('#ffffff'))
c.rect(0, 0, W, H, fill=1, stroke=0)
c.setFillColor(HexColor(INK))
c.rect(0, 41, 216, H - 41, fill=1, stroke=0)

def text(value, x, top, size=10, font='Body', color=INK, spacing=0):
    c.saveState()
    t = c.beginText(x, H-top-size)
    t.setFont(font, size)
    t.setFillColor(HexColor(color))
    t.setCharSpace(spacing)
    t.textOut(value)
    c.drawText(t)
    c.restoreState()

def right(value, x, top, size=9, color=MUTED):
    c.setFillColor(HexColor(color))
    c.setFont('Body', size)
    c.drawRightString(x, H-top-size, value)

def paragraph(value, x, top, width, size=9.5, leading=12.5, font='Body', color=INK):
    p = Paragraph(value, ParagraphStyle('cv', fontName=font, fontSize=size, leading=leading, textColor=HexColor(color), spaceAfter=0))
    _, height = p.wrap(width, H)
    p.drawOn(c, x, H-top-height)
    return top+height

def heading(value, x, top, sidebar=False):
    text(value, x, top, 12.2 if sidebar else 13, 'DisplayBold', LIGHT if sidebar else INK, 2.0)

def rule(top):
    c.setStrokeColor(HexColor('#bbbbbd'))
    c.setLineWidth(.55)
    c.line(216, H-top, W, H-top)

def bullets(items, top, size=9.3, leading=12.3):
    for item in items:
        c.setFillColor(HexColor(INK))
        c.circle(259, H-top-5.5, 1.25, fill=1, stroke=0)
        top = paragraph(escape(item), 267, top, 303, size, leading) + 3
    return top

def job(role, company, dates, top, items, current=False):
    text(role, 256, top, 10.2, 'BodyBold', WINE if current else INK)
    text(company, 256, top+15, 11.2, 'BodyBold')
    right(dates, 570, top+17, 8.7)
    return bullets(items, top+34)

# Reuse the original portrait without changing it.
portrait = PdfReader(SOURCE).pages[0].images[0]
c.drawImage(ImageReader(BytesIO(portrait.data)), 20, H-200, 180, 180, mask='auto')

heading('KONTAKT', 28, 219, sidebar=True)
text('739 258 786', 28, 244, 10, color=LIGHT)
text('contact@dorlowski.dev', 28, 261, 10, color=LIGHT)
text('Kraków', 28, 278, 10, color=LIGHT)
text('dorlowski.dev', 28, 295, 10, color=LIGHT)
c.linkURL('tel:+48739258786', (28, H-257, 170, H-243), relative=0, thickness=0)
c.linkURL('mailto:contact@dorlowski.dev', (28, H-274, 195, H-260), relative=0, thickness=0)
c.linkURL('https://dorlowski.dev/', (28, H-308, 160, H-294), relative=0, thickness=0)

heading('WYKSZTAŁCENIE', 28, 332, sidebar=True)
text('2021 - 2025', 28, 357, 9.5, color=LIGHT)
y = paragraph('Politechnika Krakowska im.<br/>Tadeusza Kościuszki', 28, 375, 170, 10, 13.3, 'BodyBold', LIGHT)
y = paragraph('Informatyka w inżynierii komputerowej.<br/>Studia bez obrony pracy dyplomowej.', 28, y+8, 166, 9.3, 12.4, color=LIGHT)

text('2018 - 2021', 28, 454, 9.5, color=LIGHT)
y = paragraph('Liceum Ogólnokształcące im. Joachima Chreptowicza w Ostrowcu Świętokrzyskim', 28, 471, 166, 10, 13.2, 'BodyBold', LIGHT)
paragraph('Bardzo dobre wyniki w nauce oraz wyróżnienie za aktywne działanie.', 28, y+7, 166, 9.2, 12.2, color=LIGHT)

heading('UMIEJĘTNOŚCI', 28, 587, sidebar=True)
for i, skill in enumerate([
    'React / Next.js / TypeScript',
    'HTML / CSS / JavaScript',
    'Node.js / Python / REST API',
    'LLM / AI / automatyzacje',
    'Git / Vercel',
    'Flutter',
]):
    text(skill, 28, 613 + i*15, 9.4, color=LIGHT)

heading('JĘZYKI', 28, 726, sidebar=True)
text('Polski - ojczysty', 28, 752, 10, color=LIGHT)
text('Angielski - B2', 28, 770, 10, color=LIGHT)

text('DAWID', 257, 17, 31, 'Display', spacing=2)
text('ORŁOWSKI', 255, 60, 35, 'DisplayBold', spacing=.4)
text('FULLSTACK AI DEVELOPER', 257, 111, 10.2, 'BodyBold', WINE, 1.3)
c.setStrokeColor(HexColor(INK))
c.setLineWidth(.65)
c.line(256, H-139, 570, H-139)

heading('O MNIE', 256, 154)
summary = ('Od maja 2026 pracuję jako Fullstack AI Developer w Webimpact. '
           'Tworzę aplikacje webowe, integracje z modelami językowymi i automatyzacje procesów. '
           'Łączę front-end w React i Next.js z logiką back-endową oraz wdrożeniami w chmurze. '
           'Doświadczenie w email marketingu pomaga mi łączyć rozwiązania techniczne '
           'z potrzebami biznesu i użytkowników.')
summary_end = paragraph(summary, 256, 181, 311, 9.7, 13.0)
assert summary_end < 255, summary_end

rule(261)
heading('DOŚWIADCZENIE', 256, 277)
y = job('Fullstack AI Developer', 'Webimpact', '05.2026 - nadal', 307, [
    'Tworzenie aplikacji full-stack z wykorzystaniem AI i modeli językowych (LLM).',
    'Integracje API, automatyzacje procesów i narzędzia wewnętrzne.',
    'Rozwój front-endu w React / Next.js, logiki back-endowej oraz wdrożeń w chmurze.',
], current=True)

y = job('Email Marketing Specialist', 'Webimpact', '09.2023 - 05.2026', y+12, [
    'Zarządzanie kampaniami w Iterable; przygotowywanie materiałów HTML i linków do kampanii.',
    'Obsługa zasobów Amazon, baz Suppress i blacklist oraz analiza testów dostarczalności.',
])

y = job('Pomoc administracyjna', 'Urząd Gminy w Lipniku', '10.2021 - 01.2022', y+12, [
    'Zarządzanie stroną internetową i fanpage’em urzędu; obsługa klienta i dokumentacji.',
])

y = job('Pracownik biura w dziale planowania', 'AGC Glass Poland', '06.2021 - 09.2021', y+12, [
    'Obsługa zamówień klientów i wprowadzanie danych szkła do systemu.',
])
assert y < 647, y

rule(654)
heading('KURSY', 256, 670)
courses = [
    ('Red Hat OpenShift I: Containers & Kubernetes 4.10', 'DO180 | 01.03.2024 - 22.06.2024'),
    ('Red Hat System Administration I 9.0', 'RH124 | 09.10.2022 - 01.05.2023'),
    ('JavaScript od Podstaw do Eksperta', 'Arkadiusz Włodarczyk'),
]
for i, (title, details) in enumerate(courses):
    text(title, 256, 697+i*31, 9.5, 'BodyBold')
    text(details, 256, 710+i*31, 8.8, color=MUTED)

legal = ('Wyrażam zgodę na przetwarzanie moich danych osobowych w celu rekrutacji zgodnie z art. 6 ust. 1 lit. a '
         'Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony '
         'osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych '
         'oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)')
legal_end = paragraph(legal, 24, 809, W-48, 7, 9, color=MUTED)
assert legal_end < 839, legal_end
c.showPage()
c.save()
print(DEST)
print({'summary_end': summary_end, 'experience_end': y, 'legal_end': legal_end})
