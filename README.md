# Gündəlik İşlər — Daily Task Tracker

React, TypeScript, Tailwind CSS və Firebase ilə hazırlanmış mobil uyğun şəxsi gündəlik iş izləmə tətbiqidir. Hər istifadəçi yalnız öz qeydlərini yaza bilər; yalnız qarşılıqlı dostlar bir-birinin fəaliyyətini oxuya bilər.

## Layihədə olanlar

- Google ilə giriş və ilk girişdə profil adı seçimi
- Hər gün üçün avtomatik tarix və iki işin qeyd edilməsi
- Əvvəlki günlərin qeydləri, ən yeni tarix yuxarıda
- Unikal Google UID və istifadəçi adı ilə dost axtarışı
- Dostluq sorğusu göndərmə, qəbul və rədd etmə
- Dostların son 7 günlük fəaliyyətinin görünməsi
- Loading ekranı, bildirişlər (toast), xəta mesajları və dark mode
- Firestore security rules, index faylı, Netlify konfiqurasiyası

## 1. Firebase layihəsini brauzerdə yaratmaq

1. Brauzerdə [Firebase Console](https://console.firebase.google.com/) səhifəsini açın və **Add project** seçin.
2. Layihə adını yazın, istəsəniz Analytics-i söndürün və **Create project** edin.
3. Açılan layihədə `</>` işarəsi olan **Web** tətbiqi əlavə edin. Qeydiyyatdan sonra göstərilən Firebase config məlumatlarını açıq saxlayın.
4. Sol menyudan **Build → Authentication → Get started** açın. **Sign-in method** bölməsində **Google** seçib **Enable** edin, dəstək e-poçtunu seçin və yadda saxlayın.
5. **Build → Firestore Database → Create database** seçin. Regionunuzu seçin. Başlanğıc qayda olaraq istənilən variantı seçə bilərsiniz; növbəti addımda təhlükəsiz qaydaları yerləşdirəcəyik.

## 2. Firebase qaydaları və indeks

1. Firestore bölməsində **Rules** səkməsini açın.
2. Bu layihədəki `firestore.rules` faylının bütün məzmununu köçürüb ora yapışdırın və **Publish** düyməsinə klik edin.
3. Eyni Firestore bölməsində **Indexes** səkməsini açın, **Create index** seçin və aşağıdakı sahələri əlavə edin:
   - Collection ID: `friendRequests`
   - `toUid` — Ascending
   - `status` — Ascending
   - `createdAt` — Descending
4. **Create index** düyməsini basın. Hazırlanması bir neçə dəqiqə çəkə bilər.

## 3. Firebase məlumatlarını Netlify-ə əlavə etmək

Bu kodda parol və Firebase açarları saxlanmır. Aşağıdakı dəyişənlər yerləşdirmə platformasında təyin edilir:

| Dəyişən | Firebase config-də qarşılığı |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

Yerli işlətmək üçün `.env.example` faylını `.env` adı ilə kopyalayın və bu dəyərləri doldurun. `.env` faylını heç vaxt açıq repoya yükləməyin.

## 4. GitHub və Netlify — yalnız brauzer ilə yayımlamaq

1. [GitHub](https://github.com/) saytında **New repository** yaradın.
2. Yeni repoda **Add file → Upload files** seçin və layihə fayllarını yükləyin. `node_modules`, `dist` və `.env` qovluq/fayllarını yükləməyin.
3. [Netlify](https://app.netlify.com/) saytında **Add new site → Import an existing project → GitHub** seçin.
4. GitHub hesabına icazə verin və yaratdığınız repozitoriyanı seçin.
5. Build command `npm run build`, Publish directory isə `dist` olmalıdır. Bu dəyərlər layihədəki `netlify.toml` ilə avtomatik tanınır.
6. **Site configuration → Environment variables** bölməsində yuxarıdakı altı `VITE_...` dəyişəni əlavə edin.
7. **Deploy site** düyməsinə basın.
8. Netlify ünvanını kopyalayın. Firebase Console-da **Authentication → Settings → Authorized domains** bölməsinə daxil olub Netlify domenini əlavə edin (məsələn `sizin-saytiniz.netlify.app`).
9. Netlify-də **Deploys → Trigger deploy → Deploy site** ilə son dəfə yenidən yayımlayın.

## Fayl quruluşu

```
src/
  components/    # Ekran və təkrar istifadə olunan UI hissələri
  contexts/      # Authentication vəziyyəti
  hooks/         # Firestore real-time məlumat hook-ları
  lib/           # Firebase başladılması
  services/      # Firestore əməliyyatları
  types/         # TypeScript modelləri
  utils/         # Tarix köməkçiləri
```

## Firestore məlumat modeli

```
users/{uid}                   # Şəxsi profil
users/{uid}/dailyLogs/{date}  # { date, task1, task2 }
publicProfiles/{uid}          # Axtarış üçün təhlükəsiz, məhdud profil
friendRequests/{requestId}    # Gözləyən / qəbul / rədd edilmiş sorğular
friendships/{uidA_uidB}       # Qarşılıqlı dostluq əlaqəsi
```

`users` və `dailyLogs` yalnız sahibinə yazmağa icazə verir. Dostluq yarandıqdan sonra qaydalar yalnız həmin dostların qeydləri oxumasına imkan verir.
