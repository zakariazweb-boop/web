CITADELLE GORGES — Website (fertig zum Hochladen)
==================================================

Dieser Ordner enthält die komplette, fertige Website. Alles ist "statisch"
(nur HTML/CSS/JS + Bilder) — du brauchst KEINE Datenbank und KEIN WordPress.

INHALT
------
- index.html ............ Startseite
- about.html ............ Über uns
- rooms.html ............ Zimmer
- restaurant.html ....... Restaurant
- activities.html ....... Aktivitäten
- gallery.html .......... Galerie
- contact.html .......... Kontakt
- booking.html .......... Buchungsanfrage
- 404.html .............. Fehlerseite
- robots.txt, sitemap.xml  (für Google)
- assets/ ............... CSS, JavaScript, Bilder, Favicon

SO STELLST DU SIE ONLINE (2 einfache Wege)
------------------------------------------
A) Netlify oder Cloudflare Pages (kostenlos, am einfachsten):
   1. Gehe zu app.netlify.com/drop  (oder Cloudflare Pages)
   2. Ziehe DIESEN GESAMTEN ORDNER per Drag & Drop ins Fenster
   3. Fertig — du bekommst sofort eine Live-URL.
   4. Danach unter "Domain" deine Domain citadelle-gorges.com verbinden.

B) Klassisches Webhosting (FTP):
   1. Verbinde dich per FTP mit deinem Webspace.
   2. Lade den GESAMTEN INHALT dieses Ordners in das Verzeichnis
      "public_html" (bzw. "www" / "htdocs") hoch.
   3. index.html muss direkt in diesem Verzeichnis liegen.

NOCH ZU AKTUALISIEREN (vor dem Posten prüfen)
---------------------------------------------
- E-Mail-Adresse (aktuell: contact@citadelle-gorges.com)
- Social-Media-Links (Facebook / Instagram / YouTube — aktuell Platzhalter)
- Zimmerpreise (aktuell "auf Anfrage")
- WhatsApp-/Telefonnummer bestätigen (+212 662 548 923)

Texte/Struktur werden zentral im Projekt unter  ..\site\build.mjs  gepflegt;
nach Änderungen dort  "node build.mjs"  ausführen und die Dateien erneut
in diesen Ordner kopieren.

Viel Erfolg! — Citadelle Gorges, Dadès Valley, Marokko
