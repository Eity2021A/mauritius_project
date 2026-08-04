import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Giveaway Terms & Conditions",
  description:
    "Official terms and conditions for Mauritius Explored promotions and giveaways. Eligibility, prizes, liability, and contact information.",
  alternates: { canonical: "/giveaway/terms" },
};

type TermsCopy = {
  brand: string;
  title: string;
  noticeBefore: string;
  giveawayPage: string;
  noticeAfter: string;
  contactText: string;
  sections: Array<{
    title: string;
    intro?: string;
    bullets?: string[];
    subheading?: string;
    subBullets?: string[];
    paragraphs?: string[];
  }>;
};

const TERMS_COPY: Record<string, TermsCopy> = {
  en: {
    brand: "Mauritius Explored",
    title: "Giveaway Terms & Conditions",
    noticeBefore:
      "Please read these terms carefully before entering. By submitting an entry, you agree to be bound by them. You can return to the",
    giveawayPage: "giveaway page",
    noticeAfter: "at any time.",
    contactText: "For any queries regarding this Giveaway, please contact:",
    sections: [
      {
        title: "1. Promoter",
        paragraphs: [
          "This Promotion (\"Giveaway\") is organised and administered by Mauritius Explored (\"Promoter\"), operating in Mauritius.",
        ],
      },
      {
        title: "2. Eligibility",
        bullets: [
          "The Giveaway is open to individuals aged 18 years or over at the time of entry.",
          "Participants must be legally able to enter promotions under the laws of Mauritius.",
          "Employees, affiliates, partners, and immediate family members of the Promoter are not eligible.",
          "The Giveaway is open internationally unless otherwise specified; participants are responsible for complying with their local laws.",
        ],
      },
      {
        title: "3. Entry Requirements",
        bullets: [
          "Participants must complete all required steps as outlined on the Giveaway page.",
          "Only one entry per person is permitted unless otherwise stated.",
          "Entries must be received before the stated closing date and time (Mauritius Time - GMT+4).",
          "The Promoter reserves the right to verify the validity of entries and participants.",
        ],
      },
      {
        title: "4. Acceptance of Terms",
        intro: "By entering this Giveaway, participants:",
        bullets: [
          "Confirm that they have read, understood, and agree to be bound by these Terms & Conditions.",
          "Agree to comply with all applicable laws and regulations in Mauritius.",
        ],
      },
      {
        title: "5. Prize(s)",
        bullets: [
          "Prize details will be specified on the Giveaway page.",
          "Prizes are non-transferable, non-exchangeable, and not redeemable for cash unless otherwise stated.",
          "The Promoter reserves the right to substitute the prize with another of equal or greater value if necessary.",
        ],
        subheading: "Travel & experience prizes (if applicable)",
        subBullets: [
          "Hotel stays, tours, or experiences are subject to availability, blackout dates, and supplier terms.",
          "The winner is responsible for any additional costs not expressly included, such as flights, visas, insurance, and personal expenses.",
        ],
      },
      {
        title: "6. Winner Selection & Notification",
        bullets: [
          "Winner(s) will be selected fairly within a reasonable period after the closing date.",
          "The winner(s) will be notified via email, phone, or social media.",
          "If a winner does not respond within 7 days, the Promoter reserves the right to select an alternative winner.",
        ],
      },
      {
        title: "7. Publicity & Marketing Consent",
        bullets: [
          "By entering, participants agree that the Promoter may use their name, image, and entry content for promotional purposes without additional compensation, unless prohibited by law.",
          "This may include use on websites, social media, and marketing materials.",
        ],
      },
      {
        title: "8. Data Protection & Privacy",
        bullets: [
          "Personal data will be processed in accordance with the Data Protection Act 2017 of Mauritius.",
          "Information collected will be used for administering the Giveaway, contacting winners, and Mauritius Explored marketing purposes.",
          "Participants have the right to access, rectify, or request deletion of their personal data in accordance with applicable law.",
        ],
      },
      {
        title: "9. Liability",
        paragraphs: [
          "Mauritius Explored and any associated companies, partners, or affiliates shall not be held responsible or liable for any loss, damage, injury, or disappointment arising from participation in the Giveaway.",
          "By accepting the prize, the winner acknowledges that the prize is used entirely at their own risk and that the Promoter bears no responsibility for incidents, accidents, or consequences resulting from its use.",
          "Nothing in these Terms excludes liability where it cannot be excluded under the laws of Mauritius.",
        ],
      },
      {
        title: "10. Disqualification",
        intro: "The Promoter reserves the right to disqualify any participant who:",
        bullets: [
          "Breaches these Terms & Conditions.",
          "Provides false or misleading information.",
          "Attempts to manipulate the Giveaway process.",
        ],
      },
      {
        title: "11. Modification, Suspension or Cancellation",
        bullets: [
          "The Promoter reserves the right to amend, suspend, or cancel the Giveaway at any time due to circumstances beyond its control or where required by law.",
        ],
      },
      {
        title: "12. Governing Law & Jurisdiction",
        bullets: [
          "This Giveaway and these Terms & Conditions shall be governed by the laws of Mauritius.",
          "Any disputes shall be subject to the exclusive jurisdiction of the courts of Mauritius.",
        ],
      },
      { title: "13. Contact" },
    ],
  },
  fr: {
    brand: "Mauritius Explored",
    title: "Conditions générales du jeu concours",
    noticeBefore:
      "Veuillez lire attentivement ces conditions avant de participer. En envoyant une participation, vous acceptez d'être lié par elles. Vous pouvez retourner à la",
    giveawayPage: "page du concours",
    noticeAfter: "à tout moment.",
    contactText: "Pour toute question concernant ce concours, veuillez contacter :",
    sections: [
      { title: "1. Organisateur", paragraphs: ["Cette promotion (« Concours ») est organisée et administrée par Mauritius Explored (« Organisateur »), opérant à Maurice."] },
      { title: "2. Éligibilité", bullets: ["Le concours est ouvert aux personnes âgées de 18 ans ou plus au moment de la participation.", "Les participants doivent être légalement autorisés à participer à des promotions selon les lois de Maurice.", "Les employés, affiliés, partenaires et membres de la famille proche de l'Organisateur ne sont pas éligibles.", "Le concours est ouvert à l'international sauf indication contraire ; chaque participant doit respecter ses lois locales."] },
      { title: "3. Conditions de participation", bullets: ["Les participants doivent compléter toutes les étapes indiquées sur la page du concours.", "Une seule participation par personne est autorisée sauf indication contraire.", "Les participations doivent être reçues avant la date et l'heure de clôture indiquées (heure de Maurice - GMT+4).", "L'Organisateur se réserve le droit de vérifier la validité des participations et des participants."] },
      { title: "4. Acceptation des conditions", intro: "En participant à ce concours, les participants :", bullets: ["Confirment avoir lu, compris et accepté ces conditions générales.", "Acceptent de respecter toutes les lois et réglementations applicables à Maurice."] },
      { title: "5. Prix", bullets: ["Les détails du prix seront indiqués sur la page du concours.", "Les prix ne sont pas transférables, échangeables ni remboursables en espèces, sauf indication contraire.", "L'Organisateur se réserve le droit de remplacer le prix par un autre de valeur égale ou supérieure si nécessaire."], subheading: "Prix de voyage et d'expérience (le cas échéant)", subBullets: ["Les séjours hôteliers, visites ou expériences dépendent des disponibilités, dates d'exclusion et conditions des fournisseurs.", "Le gagnant est responsable de tous les frais supplémentaires non expressément inclus, comme vols, visas, assurances et dépenses personnelles."] },
      { title: "6. Sélection et notification du gagnant", bullets: ["Le ou les gagnants seront sélectionnés équitablement dans un délai raisonnable après la date de clôture.", "Le ou les gagnants seront contactés par email, téléphone ou réseaux sociaux.", "Si un gagnant ne répond pas sous 7 jours, l'Organisateur se réserve le droit de sélectionner un autre gagnant."] },
      { title: "7. Publicité et consentement marketing", bullets: ["En participant, les participants acceptent que l'Organisateur puisse utiliser leur nom, image et contenu de participation à des fins promotionnelles sans rémunération supplémentaire, sauf interdiction légale.", "Cela peut inclure une utilisation sur les sites web, réseaux sociaux et supports marketing."] },
      { title: "8. Protection des données et confidentialité", bullets: ["Les données personnelles seront traitées conformément au Data Protection Act 2017 de Maurice.", "Les informations collectées seront utilisées pour administrer le concours, contacter les gagnants et les activités marketing de Mauritius Explored.", "Les participants ont le droit d'accéder à leurs données, de les rectifier ou d'en demander la suppression conformément à la loi applicable."] },
      { title: "9. Responsabilité", paragraphs: ["Mauritius Explored ainsi que les sociétés, partenaires ou affiliés associés ne peuvent être tenus responsables de toute perte, dommage, blessure ou déception liée à la participation au concours.", "En acceptant le prix, le gagnant reconnaît l'utiliser entièrement à ses propres risques et accepte que l'Organisateur ne soit pas responsable des incidents, accidents ou conséquences liés à son utilisation.", "Aucune disposition de ces conditions n'exclut une responsabilité qui ne peut être exclue selon les lois de Maurice."] },
      { title: "10. Disqualification", intro: "L'Organisateur se réserve le droit de disqualifier tout participant qui :", bullets: ["Enfreint ces conditions générales.", "Fournit des informations fausses ou trompeuses.", "Tente de manipuler le processus du concours."] },
      { title: "11. Modification, suspension ou annulation", bullets: ["L'Organisateur se réserve le droit de modifier, suspendre ou annuler le concours à tout moment en raison de circonstances indépendantes de sa volonté ou lorsque la loi l'exige."] },
      { title: "12. Droit applicable et juridiction", bullets: ["Ce concours et ces conditions générales sont régis par les lois de Maurice.", "Tout litige relève de la compétence exclusive des tribunaux de Maurice."] },
      { title: "13. Contact" },
    ],
  },
  de: {
    brand: "Mauritius Explored",
    title: "Teilnahmebedingungen für das Gewinnspiel",
    noticeBefore: "Bitte lesen Sie diese Bedingungen sorgfältig, bevor Sie teilnehmen. Mit dem Absenden einer Teilnahme akzeptieren Sie diese Bedingungen. Sie können jederzeit zur",
    giveawayPage: "Gewinnspielseite",
    noticeAfter: "zurückkehren.",
    contactText: "Bei Fragen zu diesem Gewinnspiel kontaktieren Sie bitte:",
    sections: [
      { title: "1. Veranstalter", paragraphs: ["Diese Promotion („Gewinnspiel“) wird von Mauritius Explored („Veranstalter“) organisiert und verwaltet und findet auf Mauritius statt."] },
      { title: "2. Teilnahmeberechtigung", bullets: ["Teilnahmeberechtigt sind Personen ab 18 Jahren zum Zeitpunkt der Teilnahme.", "Teilnehmende müssen nach dem Recht von Mauritius berechtigt sein, an Promotionen teilzunehmen.", "Mitarbeitende, Partner, verbundene Unternehmen und unmittelbare Familienangehörige des Veranstalters sind ausgeschlossen.", "Das Gewinnspiel ist international offen, sofern nicht anders angegeben; Teilnehmende müssen ihre lokalen Gesetze beachten."] },
      { title: "3. Teilnahmevoraussetzungen", bullets: ["Alle auf der Gewinnspielseite genannten Schritte müssen vollständig abgeschlossen werden.", "Pro Person ist nur eine Teilnahme erlaubt, sofern nicht anders angegeben.", "Teilnahmen müssen vor dem angegebenen Einsendeschluss eingehen (Mauritius-Zeit - GMT+4).", "Der Veranstalter darf die Gültigkeit von Teilnahmen und Teilnehmenden prüfen."] },
      { title: "4. Annahme der Bedingungen", intro: "Mit der Teilnahme bestätigen die Teilnehmenden:", bullets: ["Dass sie diese Teilnahmebedingungen gelesen, verstanden und akzeptiert haben.", "Dass sie alle geltenden Gesetze und Vorschriften auf Mauritius einhalten."] },
      { title: "5. Preise", bullets: ["Details zum Preis werden auf der Gewinnspielseite genannt.", "Preise sind nicht übertragbar, nicht umtauschbar und nicht in bar auszahlbar, sofern nicht anders angegeben.", "Der Veranstalter kann den Preis bei Bedarf durch einen gleichwertigen oder höherwertigen Preis ersetzen."], subheading: "Reise- und Erlebnispreise (falls zutreffend)", subBullets: ["Hotelaufenthalte, Touren oder Erlebnisse unterliegen Verfügbarkeit, Sperrdaten und Bedingungen der Anbieter.", "Der Gewinner trägt zusätzliche Kosten, die nicht ausdrücklich enthalten sind, z. B. Flüge, Visa, Versicherung und persönliche Ausgaben."] },
      { title: "6. Auswahl und Benachrichtigung", bullets: ["Gewinner werden nach dem Einsendeschluss fair innerhalb eines angemessenen Zeitraums ausgewählt.", "Gewinner werden per E-Mail, Telefon oder Social Media benachrichtigt.", "Antwortet ein Gewinner nicht innerhalb von 7 Tagen, kann der Veranstalter einen Ersatzgewinner auswählen."] },
      { title: "7. Werbung und Marketingeinwilligung", bullets: ["Mit der Teilnahme stimmen Teilnehmende zu, dass Name, Bild und Teilnahmeinhalt zu Werbezwecken ohne zusätzliche Vergütung genutzt werden dürfen, soweit gesetzlich zulässig.", "Dies kann die Nutzung auf Websites, Social Media und Marketingmaterialien umfassen."] },
      { title: "8. Datenschutz", bullets: ["Personenbezogene Daten werden gemäß dem Data Protection Act 2017 von Mauritius verarbeitet.", "Die erhobenen Informationen werden zur Durchführung des Gewinnspiels, Kontaktaufnahme mit Gewinnern und für Marketingzwecke von Mauritius Explored genutzt.", "Teilnehmende können nach geltendem Recht Auskunft, Berichtigung oder Löschung ihrer personenbezogenen Daten verlangen."] },
      { title: "9. Haftung", paragraphs: ["Mauritius Explored sowie verbundene Unternehmen, Partner oder Affiliates haften nicht für Verluste, Schäden, Verletzungen oder Enttäuschungen, die aus der Teilnahme am Gewinnspiel entstehen.", "Mit Annahme des Preises erkennt der Gewinner an, dass die Nutzung vollständig auf eigenes Risiko erfolgt und der Veranstalter nicht für Vorfälle, Unfälle oder Folgen der Nutzung verantwortlich ist.", "Nichts in diesen Bedingungen schließt eine Haftung aus, die nach dem Recht von Mauritius nicht ausgeschlossen werden kann."] },
      { title: "10. Disqualifikation", intro: "Der Veranstalter kann Teilnehmende disqualifizieren, die:", bullets: ["Gegen diese Bedingungen verstoßen.", "Falsche oder irreführende Angaben machen.", "Versuchen, den Gewinnspielprozess zu manipulieren."] },
      { title: "11. Änderung, Aussetzung oder Absage", bullets: ["Der Veranstalter kann das Gewinnspiel jederzeit ändern, aussetzen oder absagen, wenn Umstände außerhalb seiner Kontrolle vorliegen oder dies gesetzlich erforderlich ist."] },
      { title: "12. Anwendbares Recht und Gerichtsstand", bullets: ["Dieses Gewinnspiel und diese Bedingungen unterliegen dem Recht von Mauritius.", "Alle Streitigkeiten unterliegen der ausschließlichen Zuständigkeit der Gerichte von Mauritius."] },
      { title: "13. Kontakt" },
    ],
  },
  it: {
    brand: "Mauritius Explored",
    title: "Termini e condizioni del concorso",
    noticeBefore: "Leggi attentamente questi termini prima di partecipare. Inviando una partecipazione, accetti di esserne vincolato. Puoi tornare alla",
    giveawayPage: "pagina del concorso",
    noticeAfter: "in qualsiasi momento.",
    contactText: "Per domande su questo concorso, contatta:",
    sections: [
      { title: "1. Promotore", paragraphs: ["Questa promozione («Concorso») è organizzata e amministrata da Mauritius Explored («Promotore»), con attività a Mauritius."] },
      { title: "2. Idoneità", bullets: ["Il concorso è aperto a persone di almeno 18 anni al momento della partecipazione.", "I partecipanti devono poter partecipare legalmente a promozioni secondo le leggi di Mauritius.", "Dipendenti, affiliati, partner e familiari stretti del Promotore non sono idonei.", "Il concorso è aperto a livello internazionale salvo diversa indicazione; i partecipanti devono rispettare le leggi locali."] },
      { title: "3. Requisiti di partecipazione", bullets: ["I partecipanti devono completare tutti i passaggi indicati nella pagina del concorso.", "È consentita una sola partecipazione per persona salvo diversa indicazione.", "Le partecipazioni devono arrivare prima della data e ora di chiusura indicate (ora di Mauritius - GMT+4).", "Il Promotore si riserva il diritto di verificare validità delle partecipazioni e dei partecipanti."] },
      { title: "4. Accettazione dei termini", intro: "Partecipando al concorso, i partecipanti:", bullets: ["Confermano di aver letto, compreso e accettato questi termini e condizioni.", "Accettano di rispettare tutte le leggi e normative applicabili a Mauritius."] },
      { title: "5. Premi", bullets: ["I dettagli del premio saranno indicati nella pagina del concorso.", "I premi non sono trasferibili, scambiabili o convertibili in denaro salvo diversa indicazione.", "Il Promotore può sostituire il premio con uno di valore uguale o superiore se necessario."], subheading: "Premi di viaggio ed esperienze (se applicabile)", subBullets: ["Soggiorni in hotel, tour o esperienze sono soggetti a disponibilità, date escluse e condizioni dei fornitori.", "Il vincitore è responsabile di eventuali costi aggiuntivi non espressamente inclusi, come voli, visti, assicurazione e spese personali."] },
      { title: "6. Selezione e notifica del vincitore", bullets: ["I vincitori saranno selezionati equamente entro un periodo ragionevole dopo la chiusura.", "I vincitori saranno contattati via email, telefono o social media.", "Se un vincitore non risponde entro 7 giorni, il Promotore può selezionare un vincitore alternativo."] },
      { title: "7. Pubblicità e consenso marketing", bullets: ["Partecipando, i partecipanti accettano che il Promotore possa usare nome, immagine e contenuto della partecipazione per scopi promozionali senza ulteriore compenso, salvo divieti di legge.", "Ciò può includere l'uso su siti web, social media e materiali marketing."] },
      { title: "8. Protezione dati e privacy", bullets: ["I dati personali saranno trattati secondo il Data Protection Act 2017 di Mauritius.", "Le informazioni raccolte saranno usate per gestire il concorso, contattare i vincitori e per finalità marketing di Mauritius Explored.", "I partecipanti hanno diritto di accedere, rettificare o chiedere la cancellazione dei propri dati personali secondo la legge applicabile."] },
      { title: "9. Responsabilità", paragraphs: ["Mauritius Explored e società, partner o affiliati collegati non saranno responsabili per perdite, danni, lesioni o delusioni derivanti dalla partecipazione al concorso.", "Accettando il premio, il vincitore riconosce che l'uso avviene interamente a proprio rischio e che il Promotore non è responsabile per incidenti, infortuni o conseguenze legate all'uso.", "Nulla in questi termini esclude responsabilità che non possono essere escluse secondo le leggi di Mauritius."] },
      { title: "10. Squalifica", intro: "Il Promotore può squalificare qualsiasi partecipante che:", bullets: ["Violi questi termini e condizioni.", "Fornisca informazioni false o fuorvianti.", "Tenti di manipolare il processo del concorso."] },
      { title: "11. Modifica, sospensione o annullamento", bullets: ["Il Promotore può modificare, sospendere o annullare il concorso in qualsiasi momento per circostanze fuori dal suo controllo o se richiesto dalla legge."] },
      { title: "12. Legge applicabile e giurisdizione", bullets: ["Questo concorso e questi termini sono regolati dalle leggi di Mauritius.", "Qualsiasi controversia sarà soggetta alla giurisdizione esclusiva dei tribunali di Mauritius."] },
      { title: "13. Contatto" },
    ],
  },
  es: {
    brand: "Mauritius Explored",
    title: "Términos y condiciones del sorteo",
    noticeBefore: "Lee atentamente estos términos antes de participar. Al enviar una participación, aceptas quedar vinculado por ellos. Puedes volver a la",
    giveawayPage: "página del sorteo",
    noticeAfter: "en cualquier momento.",
    contactText: "Para cualquier consulta sobre este sorteo, contacta con:",
    sections: [
      { title: "1. Promotor", paragraphs: ["Esta promoción («Sorteo») está organizada y administrada por Mauritius Explored («Promotor»), que opera en Mauricio."] },
      { title: "2. Elegibilidad", bullets: ["El sorteo está abierto a personas de 18 años o más en el momento de participar.", "Los participantes deben poder participar legalmente en promociones según las leyes de Mauricio.", "Empleados, afiliados, socios y familiares directos del Promotor no son elegibles.", "El sorteo está abierto internacionalmente salvo indicación contraria; los participantes deben cumplir sus leyes locales."] },
      { title: "3. Requisitos de participación", bullets: ["Los participantes deben completar todos los pasos indicados en la página del sorteo.", "Solo se permite una participación por persona salvo indicación contraria.", "Las participaciones deben recibirse antes de la fecha y hora de cierre indicadas (hora de Mauricio - GMT+4).", "El Promotor se reserva el derecho de verificar la validez de las participaciones y los participantes."] },
      { title: "4. Aceptación de términos", intro: "Al participar en este sorteo, los participantes:", bullets: ["Confirman que han leído, entendido y aceptado estos términos y condiciones.", "Aceptan cumplir todas las leyes y regulaciones aplicables en Mauricio."] },
      { title: "5. Premio(s)", bullets: ["Los detalles del premio se especificarán en la página del sorteo.", "Los premios no son transferibles, canjeables ni convertibles en efectivo salvo indicación contraria.", "El Promotor puede sustituir el premio por otro de igual o mayor valor si fuera necesario."], subheading: "Premios de viaje y experiencias (si aplica)", subBullets: ["Estancias de hotel, tours o experiencias están sujetos a disponibilidad, fechas bloqueadas y condiciones del proveedor.", "El ganador es responsable de cualquier coste adicional no incluido expresamente, como vuelos, visas, seguro y gastos personales."] },
      { title: "6. Selección y notificación del ganador", bullets: ["Los ganadores serán seleccionados de forma justa dentro de un periodo razonable tras la fecha de cierre.", "Los ganadores serán notificados por email, teléfono o redes sociales.", "Si un ganador no responde en 7 días, el Promotor puede seleccionar un ganador alternativo."] },
      { title: "7. Publicidad y consentimiento de marketing", bullets: ["Al participar, los participantes aceptan que el Promotor pueda usar su nombre, imagen y contenido de participación con fines promocionales sin compensación adicional, salvo prohibición legal.", "Esto puede incluir uso en sitios web, redes sociales y materiales de marketing."] },
      { title: "8. Protección de datos y privacidad", bullets: ["Los datos personales se procesarán de acuerdo con la Data Protection Act 2017 de Mauricio.", "La información recopilada se usará para administrar el sorteo, contactar a ganadores y para fines de marketing de Mauritius Explored.", "Los participantes tienen derecho a acceder, rectificar o solicitar la eliminación de sus datos personales conforme a la ley aplicable."] },
      { title: "9. Responsabilidad", paragraphs: ["Mauritius Explored y sus empresas asociadas, socios o afiliados no serán responsables de pérdidas, daños, lesiones o decepciones derivadas de la participación en el sorteo.", "Al aceptar el premio, el ganador reconoce que lo usa enteramente bajo su propio riesgo y que el Promotor no es responsable de incidentes, accidentes o consecuencias derivadas de su uso.", "Nada en estos términos excluye responsabilidad cuando no pueda excluirse bajo las leyes de Mauricio."] },
      { title: "10. Descalificación", intro: "El Promotor puede descalificar a cualquier participante que:", bullets: ["Incumpla estos términos y condiciones.", "Proporcione información falsa o engañosa.", "Intente manipular el proceso del sorteo."] },
      { title: "11. Modificación, suspensión o cancelación", bullets: ["El Promotor puede modificar, suspender o cancelar el sorteo en cualquier momento por circunstancias fuera de su control o cuando lo exija la ley."] },
      { title: "12. Ley aplicable y jurisdicción", bullets: ["Este sorteo y estos términos se regirán por las leyes de Mauricio.", "Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Mauricio."] },
      { title: "13. Contacto" },
    ],
  },
  ru: {
    brand: "Mauritius Explored",
    title: "Условия розыгрыша",
    noticeBefore: "Пожалуйста, внимательно прочитайте эти условия перед участием. Отправляя заявку, вы соглашаетесь соблюдать их. Вы можете вернуться на",
    giveawayPage: "страницу розыгрыша",
    noticeAfter: "в любое время.",
    contactText: "По любым вопросам об этом розыгрыше свяжитесь с нами:",
    sections: [
      { title: "1. Организатор", paragraphs: ["Эта акция («Розыгрыш») организуется и администрируется Mauritius Explored («Организатор»), работающим на Маврикии."] },
      { title: "2. Право на участие", bullets: ["К участию допускаются лица от 18 лет на момент подачи заявки.", "Участники должны иметь законное право участвовать в промоакциях согласно законам Маврикия.", "Сотрудники, аффилированные лица, партнеры и ближайшие родственники Организатора не допускаются.", "Розыгрыш открыт международно, если не указано иное; участники отвечают за соблюдение своих местных законов."] },
      { title: "3. Требования к участию", bullets: ["Участники должны выполнить все обязательные шаги, указанные на странице розыгрыша.", "Разрешена только одна заявка от человека, если не указано иное.", "Заявки должны быть получены до указанной даты и времени закрытия (время Маврикия - GMT+4).", "Организатор оставляет за собой право проверять действительность заявок и участников."] },
      { title: "4. Принятие условий", intro: "Участвуя в розыгрыше, участники:", bullets: ["Подтверждают, что прочитали, поняли и приняли эти условия.", "Соглашаются соблюдать все применимые законы и правила Маврикия."] },
      { title: "5. Призы", bullets: ["Подробности приза будут указаны на странице розыгрыша.", "Призы не передаются, не обмениваются и не выплачиваются наличными, если не указано иное.", "Организатор может заменить приз другим призом равной или большей стоимости при необходимости."], subheading: "Путешествия и впечатления (если применимо)", subBullets: ["Проживание в отеле, туры или впечатления зависят от доступности, закрытых дат и условий поставщиков.", "Победитель несет ответственность за дополнительные расходы, которые явно не включены, например перелеты, визы, страховку и личные траты."] },
      { title: "6. Выбор и уведомление победителя", bullets: ["Победители будут выбраны честно в разумный срок после даты закрытия.", "Победители будут уведомлены по email, телефону или через социальные сети.", "Если победитель не ответит в течение 7 дней, Организатор может выбрать другого победителя."] },
      { title: "7. Публичность и маркетинговое согласие", bullets: ["Участвуя, участники соглашаются, что Организатор может использовать их имя, изображение и материалы заявки в рекламных целях без дополнительной компенсации, если это не запрещено законом.", "Это может включать использование на сайтах, в социальных сетях и маркетинговых материалах."] },
      { title: "8. Защита данных и конфиденциальность", bullets: ["Персональные данные будут обрабатываться согласно Data Protection Act 2017 Маврикия.", "Собранная информация будет использоваться для проведения розыгрыша, связи с победителями и маркетинга Mauritius Explored.", "Участники имеют право получить доступ к своим данным, исправить их или запросить удаление согласно применимому законодательству."] },
      { title: "9. Ответственность", paragraphs: ["Mauritius Explored, связанные компании, партнеры и аффилированные лица не несут ответственности за потери, ущерб, травмы или разочарования, возникшие из-за участия в розыгрыше.", "Принимая приз, победитель признает, что использует его полностью на свой риск, а Организатор не несет ответственности за инциденты, несчастные случаи или последствия использования.", "Ничто в этих условиях не исключает ответственность, если ее нельзя исключить по законам Маврикия."] },
      { title: "10. Дисквалификация", intro: "Организатор может дисквалифицировать участника, который:", bullets: ["Нарушает эти условия.", "Предоставляет ложную или вводящую в заблуждение информацию.", "Пытается манипулировать процессом розыгрыша."] },
      { title: "11. Изменение, приостановка или отмена", bullets: ["Организатор может изменить, приостановить или отменить розыгрыш в любое время из-за обстоятельств вне его контроля или если этого требует закон."] },
      { title: "12. Применимое право и юрисдикция", bullets: ["Этот розыгрыш и эти условия регулируются законами Маврикия.", "Любые споры подлежат исключительной юрисдикции судов Маврикия."] },
      { title: "13. Контакты" },
    ],
  },
};

function getTermsCopy(locale: string) {
  return TERMS_COPY[locale] ?? TERMS_COPY.en;
}

export default async function GiveawayTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getTermsCopy(locale);

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative h-[36vh] min-h-[220px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-beach-resort-sunset-mauritius.jpg")}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/90">{copy.brand}</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{copy.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-5">
              <p className="text-sm leading-relaxed text-gray-800">
                {copy.noticeBefore}{" "}
                <Link href="/giveaway" className="font-medium text-orange-600 hover:underline">
                  {copy.giveawayPage}
                </Link>{" "}
                {copy.noticeAfter}
              </p>
            </div>

            <div className="space-y-10">
              {copy.sections.map((section) => (
                <article key={section.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900">{section.title}</h2>

                  {section.intro ? <p className="mb-3 leading-relaxed text-gray-700">{section.intro}</p> : null}

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mb-3 leading-relaxed text-gray-700 last:mb-0">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.subheading ? <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-900">{section.subheading}</h3> : null}

                  {section.subBullets ? (
                    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
                      {section.subBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.title.includes("13.") ? (
                    <p className="leading-relaxed text-gray-700">
                      {copy.contactText}{" "}
                      <a href="mailto:info@mauritiusexplored.com" className="font-medium text-orange-600 hover:underline">
                        info@mauritiusexplored.com
                      </a>
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
