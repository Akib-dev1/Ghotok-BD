# 🧡 Ghotok BD - Matrimony Website (MERN Stack)

**Ghotok BD** is a feature-rich Matrimony Website built using the MERN Stack. It enables users to create and manage biodatas, find potential partners, and interact through a secure system with premium features and Stripe-powered contact requests.

🔗 **Live Website:** [https://assignment-12-akib-dev1.netlify.app](https://assignment-12-akib-dev1.netlify.app)

---

## 📌 Core Features

### 🌐 Home Page
- Responsive Navbar (Home, Biodatas, About, Contact, Login/Dashboard)
- Banner/Slider + 6 Premium Biodatas (age-based sorting)
- How It Works Section
- Success Counter (Girls, Boys, Marriages)
- Success Stories (Sorted by Marriage Date)
- Catchy Footer

### 🔍 Biodatas Page
- Filter biodatas by:
  - Age (range)
  - Type (Male/Female)
  - Division (7 divisions)
- Show 20 biodatas with `View Profile` buttons
- Pagination support

### 🔐 Authentication
- Email/Password & Google Sign-In
- JWT token-based protection
- Private routes (View Biodata, Dashboard, Checkout)

---

## 👤 User Dashboard

- **Edit Biodata**: Create or update your biodata with full details
- **View Biodata**: Preview all submitted info + request premium
- **My Contact Request**: View status of contact access requests
- **My Favourites**: Manage favorite biodatas
- **Got Married**: Share your success story with the community
- **Logout**

---

## 🛒 Checkout Page
- Protected route with Stripe integration
- View biodataId + user email (readonly)
- Pay $5 to request contact info
- Admin approves before user gets access

---

## 🛠️ Admin Dashboard

- View Total Stats (male/female/premium/revenue)
- Pie chart of biodata and payment data
- Manage Users (make admin or premium)
- Approve Premium Requests
- Approve Contact Info Requests
- Manage Success Stories (View in modal)

---

## 📊 Charts & Analytics
- Admin dashboard includes:
  - Pie chart for total, male, female, premium biodatas
  - Total Stripe revenue

---

## 💵 Payment Integration
- Stripe Checkout to request contact info
- Admin approval workflow
- Premium biodata visibility on home

---

## 📚 Tech Stack

| Tech                         | Purpose                                      |
|------------------------------|----------------------------------------------|
| React + React Router         | Frontend UI & Routing                        |
| Tailwind CSS                 | Styling                                      |
| Firebase                     | Authentication (Email/Google)                |
| Stripe                       | Payment gateway                              |
| Express.js + MongoDB         | Backend API & Database                       |
| JWT                          | Auth token security                          |
| React Query                  | API state management                         |
| Chart.js / Recharts          | Admin analytics                              |

---

## 🧩 Dependencies Used

```json
"@radix-ui/react-avatar": "^1.1.10",
"@radix-ui/react-dialog": "^1.1.14",
"@radix-ui/react-dropdown-menu": "^2.1.15",
"@radix-ui/react-label": "^2.1.7",
"@radix-ui/react-slot": "^1.2.3",
"@smastrom/react-rating": "^1.5.0",
"@stripe/react-stripe-js": "^3.7.0",
"@tailwindcss/vite": "^4.1.11",
"@tanstack/react-query": "^5.81.5",
"axios": "^1.10.0",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"firebase": "^11.10.0",
"lucide-react": "^0.525.0",
"react": "^19.1.0",
"react-countup": "^6.5.3",
"react-dom": "^19.1.0",
"react-hook-form": "^7.60.0",
"react-hot-toast": "^2.5.2",
"react-icons": "^5.5.0",
"react-router": "^7.6.3",
"react-spinners": "^0.17.0",
"recharts": "^3.1.0",
"sweetalert2": "^11.22.2",
"tailwind-merge": "^3.3.1",
"tailwindcss": "^4.1.11"
