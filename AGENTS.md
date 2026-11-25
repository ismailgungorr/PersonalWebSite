# PersonalWebSite çalışma talimatları

## Amaç ve kapsam

İsmail Güngör’ün iş başvurularında kullanacağı tek sayfalı portföyü geliştir. Kariyer odağı yazılım geliştirme, ERP ve iş süreçleri, IT, veri teknolojileri ve dijital dönüşümdür. Geliştirmeyi aşamalara böl. Her aşamada sahibin onayladığı işleri tamamla ve bir sonraki aşama için onay bekle. Yeni özellikler, teknolojiler ve yayın işlemleri için sahibin onayını al.

## Teknoloji ve mimari

React, Vite, strict TypeScript, Tailwind CSS, Motion (`motion/react`), Lucide React, i18next, react-i18next, ESLint ve Prettier kullan. İlk aşama statik istemci uygulamasıdır. Backend, API, kimlik doğrulama ve veri tabanı ekleme.

- `public/images/profile`, `public/images/projects` ve `public/documents` onaylı, doğrudan sunulacak varlıklar içindir.
- `src/assets` derleme sırasında içe aktarılan varlıklar içindir.
- `src/components/layout` yerleşim, `src/components/ui` yeniden kullanılabilir arayüz bileşenleri içindir.
- `src/sections` sayfa bölümleri, `src/data` tipli içerik, `src/locales` çeviriler içindir.
- `src/hooks`, `src/types` ve `src/lib` sırasıyla paylaşılan hook’lar, türler ve altyapı içindir.
- `src/App.tsx` uygulamayı birleştirir, `src/main.tsx` uygulamayı başlatır, `src/index.css` tasarım değişkenlerini ve temel stilleri içerir.

## Tasarım ve erişilebilirlik

Premium Bento Grid ve koyu tema kullan. Arka plan `#09090B`, kart `#18181B`, ikincil yüzey ve kenarlık `#27272A`, vurgu `#10B981`, ana metin `#F4F4F5`, ikincil metin `#A1A1AA` olmalıdır. Ana yazı tipi Inter, teknik detayların yazı tipi JetBrains Mono olmalıdır. Mobil öncelikli düzen, tutarlı boşluk, hafif kenarlık ve görünür odak kullan. Klavye erişimini, kontrastı ve `prefers-reduced-motion` tercihini destekle. Yoğun gölge, neon ve gereksiz gradyan kullanma.

## Kod ve çeviri

React fonksiyon bileşenleri ve semantik HTML kullan. Dosya, fonksiyon ve değişken adlarını İngilizce yaz. Gereksiz `any`, soyutlama ve bağımlılıklardan kaçın. Tekrarlanan ortak arayüz davranışını uygun paylaşılan bileşenlerde tut.

Görünür ve erişilebilirlik amaçlı arayüz metinlerini `src/locales/tr.json` ve `src/locales/en.json` dosyalarında aynı anahtarlarla tut. Varsayılan dil Türkçedir. i18next ile dil tercihini `localStorage` içinde sakla ve değişiklikte HTML `lang` özniteliğini güncelle.

## Kişisel bilgi ve doğrulama

Yalnızca proje sahibinin verdiği veya açıkça doğruladığı kişisel bilgileri kullan. Deneyim, proje, sertifika, başarı, fotoğraf veya CV uydurma. Sağlanmamış iletişim bilgileri ve belgeler için bağlantı oluşturma. Kaynak koda hassas bilgi ekleme.

Windows’ta npm komutlarını `npm.cmd` üzerinden çalıştır ve PowerShell güvenlik ayarını değiştirme. Her aşamayı kapatmadan önce `npm.cmd run typecheck`, `npm.cmd run lint` ve `npm.cmd run build` komutlarını çalıştır. Biçimi `npm.cmd run format:check` ile doğrula. Hata düzeltmelerinden sonra ilgili kontrolleri tekrarla ve doğrulanamayan sonuçları raporla.

Yerel tarayıcı testlerinde her çalıştırma için işletim sisteminin geçici dizininde (`os.tmpdir()`) ayrı bir tarayıcı profili oluştur. Projede tutulması gereken geçici test çıktılarını `.browser-tests/` altında sakla. Test bittiğinde yalnızca testin başlattığı tarayıcıyı normal kapatma akışıyla durdur.

## Phase 5 durumu

- Deneyim, eğitim, ek bilgiler ve özgeçmiş bölümleri eklendi. Deneyim verileri `src/data/experience.ts` dosyasında, ortak eğitim dönemi `src/data/profile.ts` dosyasında tutulur.
- Proje vitrini ve deneyim zaman çizelgesi, `App.tsx` üzerinden aynı `ProjectDetails` penceresini açar. Mevcut projeleri kimlikleriyle ilişkilendir ve kapanışta odağı açan denetime döndür.
- Hero ve Özgeçmiş bölümü `src/data/resume.ts` içindeki dile özel kullanılabilirlik ayarlarını paylaşır. Onaylı dosyaları `public/resume/ismail-gungor-cv-tr.pdf` ve `public/resume/ismail-gungor-cv-en.pdf` yollarına ekle. Her dosya için yalnızca kendi `available` ayarını `true` yap. PDF olmayan dilde indirme ve görüntüleme bağlantısı oluşturma.
- Vite izleme istisnalarını ve Git ignore kurallarını koru. Phase 6’ya yalnızca proje sahibi onay verdiğinde başla.

## Phase 6 durumu

- İletişim bölümü özgeçmişten sonra, footer ise ana içeriğin ardından yer alır. Navbar ve Footer, `src/components/layout/navigation.ts` içindeki mevcut bölüm kimliklerini paylaşır.
- Yayımlanması onaylanmış e-posta, sosyal profil adresleri ve iş fırsatı durumu `src/data/contact.ts` dosyasında tutulur. İletişim ve Footer sosyal görünürlüğü için `enabled` değerini, Hero ve İletişim ortak durum göstergesi için `openToWork` değerini kullanır. Konum için mevcut profil verisini kullanmaya devam et.
- E-posta için doğrudan `mailto:` ve Clipboard API kullanılır. Yalnızca başarılı kopyalama işleminden sonra başarı mesajı göster. Harici sosyal bağlantılarda yeni sekme erişilebilir adını ve güvenli `rel` değerlerini koru.
- Özgeçmiş kullanılabilirliği ve Vite izleme istisnaları önceki aşamalardaki kurallarla devam eder. Phase 7’ye yalnızca proje sahibi onay verdiğinde başla.

## Phase 7 durumu

- Ortak giriş ve gecikme tanımları `src/lib/motion.ts` içindedir. Azaltılmış hareket etkinse kart animasyonlarını ve modal girişini kaldır. Modalı native dialog davranışıyla gecikmesiz kapat.
- Proje görselleri `screenshot` ve `illustration` türleriyle yönetilir. Kart ve detay penceresinde aynı veriyi kullan. İllüstrasyonları iki dilde temsili olarak etiketle, alt metin ekle ve mevcut gerçek ekran görüntülerini koru.
- CV yayımlanmadan önce görünür içeriği, belge dilini, metadata’yı ve gömülü içeriği denetle. Telefon numarası için yayın izni yalnızca `public/resume/ismail-gungor-cv-tr.pdf` ve `public/resume/ismail-gungor-cv-en.pdf` dosyalarını kapsar. HTML, iletişim bölümü, JavaScript, JSON-LD, Open Graph ve diğer site metadata’sı, dokümantasyon ve commit mesajları için telefon gizliliği kuralını uygula. Diğer kişisel bilgileri yayın onayına göre denetle.
- Çeviri anahtarlarını ve yer tutucuları iki dilde eşleştir. Paket analizi, SEO ve genel Scroll Spy çalışmaları için Phase 8 onayını bekle.

## Phase 8 durumu

- Proje detayı `src/hooks/useProjectDetails.ts` üzerinden ihtiyaç anında yüklenir. Bekleyen isteği kullanıcı başka denetime geçtiğinde iptal et ve modal kapanışında odağı açan düğmeye döndür.
- Scroll Spy `src/hooks/useActiveSection.ts` içinde konum önbelleğini kullanır. Manuel kaydırma sırasında URL geçmişine kayıt ekleme.
- SEO metadata ve tarama dosyaları `build/site-seo.ts` tarafından üretilir. Nihai HTTPS adresi ve açık indeksleme bayrağı olmadan `noindex, follow` güvenli varsayılandır. Üretilen siteye ölçüm raporlarını, orijinal arşivleri veya özel dosyaları ekleme.
- Vite izleme istisnalarını, CV kullanılabilirliğini ve onaylı iletişim bilgilerini koru. Phase 9 için kullanıcının onayını bekle.

## Phase 9 yayın kuralları

- Yayın hedefi GitHub’daki `ismailgungorr/PersonalWebSite` deposunun `main` dalı ve Vercel Git entegrasyonudur. Yalnızca gizlilik taramasından geçen dosyaları gönder.
- Mevcut Vercel projesi `personalwebsite` ve kalıcı production adresi `https://ismailgungor.vercel.app`. GitHub `main` dalından otomatik dağıtımı, eski proje adresindeki HTTP 308 yönlendirmesini ve otomatik Vercel adreslerinin erişim korumasını koru.
- `VITE_SITE_URL` ve `VITE_SITE_INDEXABLE=true` yalnızca Production ortamına aittir. Preview için `noindex, follow` davranışını, canlı HTML için canonical, Open Graph, JSON-LD, robots.txt ve sitemap eşleşmesini koru.
- Canlı commit eşleşmesi ile zorunlu production kontrolleri tamamlandığında `v1.0.0` sürümünü ve tag’i hazırla. Yetkilendirme ve Search Console sahipliği için kullanıcı oturumunu kullan.

## v1.0.1 özgeçmiş güncellemesi

- Hero, arayüz diline ait onaylı PDF’yi indirir. Özgeçmiş bölümü her iki dili de sunar ve arayüz dilini ilk sıraya alır. Dile ait PDF yoksa `src/data/resume.ts` içindeki `available` değerini kapat.
- PDF’leri ilk yüklemede isteme ve sitemap’e ekleme. `vercel.json` dosyasındaki `X-Robots-Tag: noindex` başlığını yalnızca iki PDF yolunda uygula.
