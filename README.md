# 🔧 Auto Service Management System

Aceasta este o aplicație web completă pentru un **service auto**, construită cu:

- 🔙 Back-end: **Django** (Python)
- 🌐 Front-end: **React.js** + **Tailwind CSS**
- 🔐 Autentificare: **JWT (JSON Web Tokens)**

Scopul aplicației este de a permite clienților să creeze rezervări pentru service, iar angajații (workers) să gestioneze aceste rezervări prin acceptare, stabilirea pieselor necesare, prețurilor și datei finalizării reparației.

---

## 📘 Funcționalități

### 👤 Autentificare
- Login realizat prin JWT pentru siguranță și persistență a sesiunii.
- Utilizatorii autentificați pot accesa funcționalități specifice (ex: clienți vs. workers).

### 🧾 Booking-uri (Rezervări)
- Clienții pot crea o rezervare pentru service (ex: revizie, reparații, verificări).
- Workers pot vedea rezervările disponibile și le pot **accepta**.
- După acceptare, pot introduce:
  - Prețul pieselor necesare
  - Data estimată de finalizare
- Rezervarea este considerată **finalizată** după setarea acestor informații.

---

## 🧠 Tehnologii & Arhitectură

### 🐍 Back-End – Django
- Framework robust și complet pentru dezvoltare rapidă.
- Urmează arhitectura **MTV (Model-Template-View)**.
- Folosește **ORM-ul integrat Django**:
  - Transformă automat modelele Python în tabele SQL
  - Simplifică interogările și persistarea datelor fără a scrie SQL manual

#### Exemple de facilități oferite de Django:
- Autogenerare tabele și migrări
- Validare automată a datelor
- Middleware pentru autentificare JWT
- API-uri REST cu `django-rest-framework`

### 📦 API REST
- Construit folosind `Django REST Framework`
- Rute protejate prin JWT
- Endpoint-uri pentru:
  - Login / Register
  - Creare / vizualizare / actualizare rezervări
  - Filtrare în funcție de status (nou, acceptat, finalizat)

### 🔐 Autentificare – JWT
- După login, clientul primește un token JWT
- Tokenul este stocat în `localStorage` în React și trimis la fiecare request autorizat
- Protecție eficientă pentru accesul resurselor private

---

## 💻 Front-End – React + Tailwind CSS
- UI modern, bazat pe React.js
- Stilizare realizată cu **Tailwind CSS**:
  - Design rapid, responsive, și consistent
  - Evită CSS redundant și permite prototipare rapidă
- Folosește `React Router` pentru navigație
- Se conectează la backend prin HTTP REST calls
- Tokenul JWT este gestionat local și folosit pentru a proteja rutele cu `PrivateRoute`

---

## 🔗 Rute importante în aplicație

| Rol       | Funcție                            | Endpoint                  |
|-----------|-------------------------------------|---------------------------|
| Client    | Login / Register                   | `/api/token/`             |
| Client    | Creează o rezervare                | `/api/bookings/`          |
| Worker    | Vizualizează rezervări noi         | `/api/bookings/?status=new` |
| Worker    | Acceptă și setează detalii         | `/api/bookings/<id>/`     |

---

## 🛠️ Cum rulezi proiectul local

### Clonează repository-ul
```bash
git clone https://github.com/username/repo-name.git
cd repo-name
Server:
python/python3 manage.py runserver


Client:
cd bookfront
npm install
npm start
