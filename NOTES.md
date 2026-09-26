# NOTES — pojmovi i koncepti (HomeBuild Operations Platform)

Kratak rezime svega što smo do sad naučili, za osvežavanje pamćenja.

## Osnovna podešavanja

- **`.venv`** — izolovano Python okruženje samo za ovaj projekat, da paketi ne prave konflikt sa drugim projektima. Aktivira se: `.venv\Scripts\activate`.
- **`.gitignore`** — govori Git-u koje fajlove da nikad ne prati (npr. `.env` sa lozinkama, `node_modules`, `.venv`).
- **`.env`** — fajl sa tajnim podacima (lozinke, ključevi), nikad se ne šalje na GitHub.
- **`requirements.txt`** — lista Python paketa i verzija koje projekat koristi (`pip freeze > requirements.txt`).

## Backend (FastAPI + SQLAlchemy + PostgreSQL)

- **FastAPI** — Python framework za pravljenje API-ja (adresa + funkcija koja odgovara na zahtev).
- **SQLAlchemy model** (`models.py`) — Python klasa koja predstavlja jednu tabelu u bazi. `relationship(...)` povezuje tabele (npr. Property ima više Task-ova).
- **Pydantic šema** (`schemas.py`) — opisuje oblik podataka koji ulaze/izlaze kroz API (validacija), odvojeno od toga kako su sačuvani u bazi.
  - `...Create` šema — šta korisnik šalje (bez `id`, baza ga sama dodeljuje).
  - `...Out` šema — šta API vraća nazad.
- **`Depends(get_db)`** — FastAPI automatski otvori konekciju sa bazom i da je funkciji na korišćenje.
- **HTTP metode (REST konvencija):**
  - `GET` — čitanje podataka
  - `POST` — kreiranje novog podatka
  - `PATCH` — izmena **dela** postojećeg podatka (npr. samo status)
  - `PUT` — zamena **celog** postojećeg podatka (nismo koristili u ovom projektu)
- **Query parametri** (npr. `?property_id=1`) — opcioni filteri u adresi, koriste se za filtriranje liste (npr. "daj mi samo faze OVE kuće").
- **`HTTPException(status_code=..., detail=...)`** — kako backend vraća grešku sa jasnom porukom. Bitni kodovi:
  - `400` — loš zahtev (npr. pokušaj da se prekrši poslovno pravilo)
  - `401` — nisi ulogovan / token nevažeći
  - `403` — jesi ulogovan, ali nemaš dozvolu za tu akciju
  - `404` — traženi podatak ne postoji

## Poslovna logika

Pravilo koje smo napravili: kuća ne može biti `completed` dok ima otvoren `issue`. Implementirano kroz SQL `.join(...)` upit koji prati vezu Issue → Inspection → ConstructionStage → Property, i broji otvorene issue-e pre nego što dozvoli promenu statusa.

## Autentifikacija (auth.py)

- **Heširanje lozinke (`hash_password`)** — pravi lozinku **nikad** ne čuvamo u bazi, samo njen jednosmerni "otisak" (hash, npr. preko bcrypt algoritma). Ne može se vratiti nazad u pravu lozinku.
- **Provera lozinke (`verify_password`)** — pri loginu, hešujemo unetu lozinku i **poredimo hešove** (ne prave lozinke).
- **JWT token (`create_access_token`)** — "digitalni pasoš" koji server da korisniku posle uspešnog login-a. Sadrži podatke o korisniku (email, uloga) i ima rok trajanja (`exp`). Potpisan je tajnim ključem (`SECRET_KEY`) da niko ne može da ga falsifikuje.
- **`get_current_user`** — funkcija koja proverava da li zahtev nosi validan token, koristi se kao `Depends(...)` na endpoint-ima koje želimo da zaštitimo.
- Zaštićen endpoint = mora imati validan token (401 ako ne) + može imati proveru uloge (403 ako uloga nije dozvoljena).

## Frontend (React + Vite)

- **`useState`** — "memorijska kutija" komponente koja čuva podatke i pamti ih između prikaza na ekranu.
- **`useEffect(() => {...}, [])`** — izvrši kod jednom kad se komponenta prvi put prikaže (prazan niz `[]` = samo jednom; `[id]` = ponovi kad se `id` promeni).
- **Controlled input** — `<input value={state} onChange={...}>` — React uvek zna tačno šta piše u polju, jer vrednost dolazi iz state-a, ne iz browsera samog.
- **`fetch(...)`** — poziva backend. Bez `method` je `GET`. Za `POST`/`PATCH` treba `method`, `headers`, i `body: JSON.stringify(...)`.
- **React Router:**
  - `BrowserRouter` (u `main.jsx`) — omogućava routing za celu aplikaciju.
  - `Routes`/`Route` (u `App.jsx`) — mapira adresu (`/properties/:id`) na komponentu.
  - `Link` — klikabilan link bez ponovnog učitavanja stranice.
  - `useParams()` — čita deo adrese (npr. `id` iz `/properties/5`).
  - `useNavigate()` — menja adresu iz koda (npr. posle uspešnog login-a).
- **`localStorage`** — memorija browsera koja ostaje sačuvana i posle zatvaranja stranice (koristimo je za čuvanje JWT tokena).
- **Tailwind CSS** — CSS okvir gde se stil piše kroz gotove klase direktno u `className="..."` (npr. `text-gray-100`, `bg-[#12181a]`, `p-4`) — nema posebnih `.css` fajlova po komponenti.

## Česte greške na koje smo nailazili

- Zaboravljen aktiviran `.venv` ili pogrešan folder pre pokretanja komande.
- Dupliran `import` kad se dodaje nova linija (umesto zamene stare).
- Nedosledna indentacija u Python kodu (izaziva `IndentationError`).
- Mešanje terminal komandi i koda koji ide unutar fajla.
- Zaboravljen potpun restart servera posle instalacije novog paketa (`--reload` prati samo izmene fajlova, ne i nove pakete).
