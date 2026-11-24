# PersonalWebSite

İsmail Güngör’ün yazılım geliştirme, ERP, bilgi teknolojileri, veri teknolojileri ve dijital dönüşüm alanlarına yönelik kişisel portföy projesi. Phase 8, yayın öncesi performans, SEO, erişilebilirlik ve navigasyon denetimlerini kapsar.

## Yerel geliştirme

Projenin kurulduğu ortam Windows 11, Node.js 24 ve npm 11’dir. PowerShell’de `npm.cmd` kullanın.

```powershell
npm.cmd ci --cache .npm-cache
npm.cmd run dev
```

Terminalde verilen yerel adresi tarayıcıda açın. Türkçe varsayılan dildir. Tarayıcı dil tercihini yerel olarak saklar.

## Doğrulama ve derleme

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run format:check
npm.cmd run build
```

`npm.cmd run format` kaynak dosyaları biçimlendirir. Production çıktısı `dist/` klasörüne yazılır. Derleme sonrasında `npm.cmd run preview` ile çıktı yerel olarak önizlenebilir.

## İletişim bilgilerini güncelleme

- Profesyonel e-posta adresini değiştirmek için `src/data/contact.ts` içindeki `contact.email` değerini düzenleyin. E-posta bağlantıları ve kopyalama düğmesi bu değeri kullanır.
- LinkedIn veya GitHub adresini değiştirmek için `socialPlatforms` içindeki ilgili kaydın `url` değerini güncelleyin. GitHub kullanıcı adı değişirse aynı kayıttaki `username` değerini de güncelleyin.
- Bir sosyal bağlantıyı iletişim bölümünde ve footer’da gizlemek için ilgili kaydın `enabled` değerini `false` yapın.
- Hero ve İletişim bölümündeki iş fırsatı göstergelerini birlikte yönetmek için `contact.openToWork` değerini güncelleyin.

## Animasyonlar ve erişilebilirlik

`src/lib/motion.ts` Bento kartlarının giriş animasyonunu ve gecikmelerini tanımlar. Görünüm alanına giren kartlar bir kez hareket eder. Klavyeyle odaklanan kart hemen görünür. Azaltılmış hareket tercihinde kartlar gecikmesiz gösterilir, modal giriş animasyonu ve yumuşak kaydırma kapatılır. Mikro etkileşimler `src/index.css` içinde yönetilir.

## Proje görselleri ve çeviriler

Proje görsellerini `public/images/projects/<proje-kimliği>/` altında saklayın. Gerçek ekran görüntülerini `src/data/projects.ts` içindeki `imageFiles` listesine dosya adı, genişlik ve yükseklikle; temsili SVG'yi `illustrationFile` alanına ekleyin. İki dilde ilgili ekran görüntüsünün `projects.items.<proje-kimliği>.images` alt metnini veya SVG için `illustrationAlt` değerini ekleyin. Kart ve detay penceresi aynı veriyi kullanır.

Arayüz metinlerini `src/locales/tr.json` ve `src/locales/en.json` dosyalarında aynı anahtarlarla güncelleyin. Yer tutucu adlarını, çoğul anahtarlarını ve `Trans` etiketlerini iki dilde eşleştirin.

## Phase 8 performans ölçümleri

İki ölçümde de Vite production preview, Chrome 158, Lighthouse 13.6.0 ve aynı mobil/masaüstü profilleri kullanıldı. Lighthouse değerleri profil başına üç koşunun medyanıdır. Dosya boyutları bayt cinsindendir. Gzip sütunları Node `gzipSync` ile hesaplandı. Tarayıcı transferi Resource Timing `transferSize` değeridir ve HTTP yanıt başlıklarını içerir. İstek sayısı belgeyi ve Resource Timing girdilerini kapsar. İlk yükleme, soğuk önbellekte 1440×900 açılışıdır.

| Metrik                           | Phase 8 öncesi | Phase 8 sonrası |
| -------------------------------- | -------------: | --------------: |
| En büyük JavaScript              |        504.396 |         456.162 |
| Toplam JavaScript                |        504.396 |         459.287 |
| Toplam JavaScript gzip           |        158.193 |         145.732 |
| İlk yükleme JavaScript           |        504.396 |         456.162 |
| İlk yükleme JavaScript transferi |        158.493 |         144.824 |
| JavaScript dosyası               |              1 |               2 |
| CSS                              |         37.256 |          33.107 |
| CSS gzip                         |          9.691 |           7.200 |
| Font                             |        302.728 |         188.924 |
| Görseller ve faviconlar          |      2.890.669 |       1.614.241 |
| Toplam dist                      |      3.735.499 |       2.307.005 |
| İlk yükleme istekleri            |              8 |               8 |

### Mobil medyan

| Lighthouse       | Phase 8 öncesi | Phase 8 sonrası |
| ---------------- | -------------: | --------------: |
| Performance      |             94 |             100 |
| Accessibility    |            100 |             100 |
| Best Practices   |             96 |             100 |
| SEO              |             83 |              66 |
| FCP (ms)         |            757 |             757 |
| LCP (ms)         |          3.007 |             757 |
| CLS              |        0,00000 |         0,00013 |
| TBT (ms)         |             87 |              57 |
| Speed Index (ms) |            910 |             803 |

### Masaüstü medyan

| Lighthouse       | Phase 8 öncesi | Phase 8 sonrası |
| ---------------- | -------------: | --------------: |
| Performance      |            100 |             100 |
| Accessibility    |            100 |             100 |
| Best Practices   |             96 |             100 |
| SEO              |             83 |              66 |
| FCP (ms)         |            209 |             369 |
| LCP (ms)         |            749 |             369 |
| CLS              |        0,00016 |         0,00059 |
| TBT (ms)         |              0 |               0 |
| Speed Index (ms) |            326 |             395 |

Preview SEO puanında `noindex`, Lighthouse `is-crawlable` denetimini düşürür. Yayın URL’si ve indeksleme etkinleştikten sonra bu kontrolü gerçek adreste yeniden çalıştırın. Bu ölçümler yerel laboratuvar verileridir. Gerçek kullanıcı INP ölçümü, yayın sonrasında saha verisiyle değerlendirilir.
Paket analizi Vite 8 / Rolldown `generateBundle` çıktısındaki modül katkılarını ve üretilen dosyaları karşılaştırır. Minifikasyon öncesi modül katkıları kaynak gruplarına göre toplandı. React DOM, Motion ve i18next başlıca katkılardı. Ortak proje detayı dinamik import ile ilk açılışta yüklenir. Hero, Navbar ve hash hedefleri tek giriş paketinde kalır. `LazyMotion`, `domAnimation` ve `m` kartların kullandığı Motion özelliklerini taşır. İkonlar statik isimli importlarla yüklenir. Lighthouse paketleri proje bağımlılıklarına eklenmeden geçici npm önbelleğinde tutulur. Ham raporlar Git ve production dışında, `.browser-tests/phase8/` dizinindedir.
İki yerel değişken fontun Latin ve Latin Extended WOFF2 dosyaları `src/fonts.css` üzerinden `font-display: swap` ile sunulur. OFL metinleri `public/fonts/` altındadır. Üç ekran görüntüsü doğrulanmış piksel boyutları korunarak WebP’ye dönüştürüldü. Bunların özgün PNG dosyaları `src/assets/project-originals/` altındadır. Diğer üç PNG ve beş SVG korunmuştur. Proje verisindeki görsel ölçüleri, alt metinleri ve yedek görsel davranışı kartlarda ve detayda ortaktır.
Navbar Scroll Spy, `ResizeObserver` ile bölüm konumlarını ve Navbar yüksekliğini ölçer. Kaydırma sırasında önbellekteki konumları kullanır. Yalnızca gerçek anchor bağlantıları hash ve geçmişi günceller. Genel `scroll-padding-top` başlığı Navbar’ın altına yerleştirir.

## SEO ve yayın yapılandırması

Varsayılan Türkçe başlık ve açıklama `index.html` içindedir. `build/site-seo.ts` Open Graph, Twitter Card, ProfilePage ve Person JSON-LD etiketlerini ve tarama dosyalarını üretir. Dil seçimi iki locale dosyasındaki `meta` değerleriyle başlığı, açıklamayı ve sosyal paylaşım metinlerini günceller. Tek URL üzerindeki TR/EN arayüzü iki ayrı indekslenebilir sayfa oluşturmaz. Sosyal tarayıcılar JavaScript çalıştırmadan varsayılan Türkçe metadata’yı okuyabilir.

Paylaşım görseli `public/images/og-image.png` (1200 × 630, 72.606 bayt). Marka simgeleri `public/favicon.svg`, `public/favicon.ico` ve `public/apple-touch-icon.png` konumundadır.

`VITE_SITE_URL`, nihai HTTPS kök adresini tanımlayan herkese açık bir build-time değerdir. Gizli bilgi saklamak için kullanılmaz. Geçerli bir adres verildiğinde canonical ve sosyal görsel için mutlak URL oluşturulur. Yayın derlemesinde `VITE_SITE_INDEXABLE=true` ayrıca ayarlandığında `index, follow`, tek URL’li sitemap ve robots Sitemap satırı üretilir. Adres veya yayın bayrağı olmadan build `noindex, follow` kullanır ve sitemap üretmez. Önizleme ortamına yayın bayrağını vermeyin.

## Phase 9 yayın öncesi kontrol listesi

- GitHub deposunu oluşturun. Git geçmişi ve production içeriğinde kişisel veri, gizli dosya ve geçici test çıktısı taraması yapın.
- Vercel projesini ve production dağıtımını hazırlayın. Nihai domain, HTTPS ve hosting güvenlik başlıklarını doğrulayın.
- Yayın için `VITE_SITE_URL` ve `VITE_SITE_INDEXABLE` değerlerini belirleyin. Canonical, mutlak Open Graph URL’leri, robots.txt, sitemap.xml ve indekslemeyi gerçek adreste doğrulayın.
- Sosyal paylaşım önizlemesini, production Lighthouse ölçümlerini ve Google Search Console adımlarını tamamlayın.
- Gerçek CV’lerde telefon ve diğer özel bilgileri kontrol edin. Türkçe dosyayı `public/resume/ismail-gungor-cv-tr.pdf`, İngilizce dosyayı `public/resume/ismail-gungor-cv-en.pdf` yoluna ekleyin. Yalnızca eklenen dosyanın `src/data/resume.ts` içindeki `available` değerini etkinleştirip görüntüleme ve indirmeyi test edin.

## Özgeçmiş gizliliği

Gerçek CV dosyası yayımlanmadan önce PDF'nin görünür içeriğini, metnini ve belge özelliklerini kontrol edin. Telefon numarasını ve yayımlanmasına onay verilmemiş kişisel bilgileri çıkarın. Yalnızca onaylı PDF'nin diline ait `available` değerini etkinleştirin.

## Proje dizinleri

- `src/components/` ortak arayüz ve yerleşim bileşenleri.
- `src/locales/` Türkçe ve İngilizce arayüz metinleri.
- `src/lib/` i18next altyapısı, `src/types/` ortak türler.
- `src/assets/`, `src/data/`, `src/hooks/` ve `src/sections/` ileride eklenecek uygulama içeriği için ayrılmış dizinler.
- `public/images/` ve `public/documents/` onaylı statik varlıklar için ayrılmış dizinler.

Proje kuralları [AGENTS.md](AGENTS.md) dosyasında yer alır.
