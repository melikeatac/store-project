# React E-Ticaret Uygulaması

Bu proje, React ve Tailwind CSS kullanılarak geliştirilmiş basit bir e-ticaret uygulamasıdır.

## Kullanılan Teknolojiler
- **React**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Hook Form & Yup**

## API Kullanımı
Ürünler, **[Fake Store API](https://fakestoreapi.com/products)** üzerinden çekildi.

## Özellikler
- **Responsive Tasarım**: Mobil ve masaüstünde uyumlu şekilde bir arayüz.
- **Filtreleme Sistemi**:
  - Ürünleri kategoriye, fiyata, görünüme ve anahtar kelimeye göre filtreleme.
- **Favorilere Ekleme**: LocalStorage kullanılarak favori ürünler kaydedilir.
- **Dark Mode / Light Mode**: Kullanıcı tercihine göre tema değişimi yapılabilir ve seçim localStorage'de saklanır.
- **Form Validasyonu**:
  - **React Hook Form** ile form yönetimi sağlandı.
  - **Yup** ile form doğrulama kuralları oluşturuldu.
- **Bildirimler**: Bildirimler için react-toastify kütüphanesi kullanıldı

## Kurulum
Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip edin:

1. **Projeyi klonlayın:**
   ```sh
   git clone git@github.com:melikeatac/store-project.git
   ```
2. **Dizin içine girin:**
   ```sh
   cd store-project
   ```
3. **Bağımlılıkları yükleyin:**
   ```sh
   npm install
   ```
4. **Projeyi çalıştırın:**
   ```sh
   npm start
   ```

Bu adımları tamamladıktan sonra proje **http://localhost:3000/** adresinde çalışacaktır.

