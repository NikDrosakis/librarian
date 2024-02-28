-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 27, 2024 at 06:10 AM
-- Server version: 10.5.23-MariaDB-0+deb11u1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `librarian`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'auto',
  `img` varchar(200) DEFAULT NULL COMMENT 'img-upload',
  `title` varchar(300) DEFAULT NULL COMMENT 'text',
  `ptitle` varchar(300) DEFAULT NULL,
  `writer` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'auto-bks_wri.name',
  `editor` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'auto-bks_editor.name',
  `format` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `filename` varchar(200) NOT NULL,
  `vol` varchar(2) NOT NULL,
  `edited` year(4) NOT NULL,
  `cat` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'auto-bks_cat.name',
  `tag` varchar(300) DEFAULT NULL,
  `isread` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'select-isread',
  `summary` text DEFAULT NULL COMMENT 'textarea',
  `notes` text DEFAULT NULL COMMENT 'textarea',
  `status` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'select-status',
  `published` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'date',
  `saved` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'date-read'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `img`, `title`, `ptitle`, `writer`, `editor`, `format`, `filename`, `vol`, `edited`, `cat`, `tag`, `isread`, `summary`, `notes`, `status`, `published`, `saved`) VALUES
(1, 'KEIMENΑ_GIΑ_TIN_ΑNΑRChIΑ___MALATESTA_ERRICO.jpg', 'Κείμενα για την Αναρχία', '', 20, 22, 1, '', '', 0000, 19, 'αναρχία', 0, 'Ερίκο Μαλατέστα', '', 0, 0, 0),
(2, 'ETSI_MILISEN_O_ZΑRΑTOYSTRΑ___NITSE_FRINTRICh___Filosofia___IANOS_gr.jpg', 'Έτσι μίλησεν ο Ζαρατούστρα', '', 1, 3, 1, '', '', 0000, 1, 'μηδενισμός, ', 0, 'ασδφ', 'ασδφ', 2, 0, 0),
(3, 'Cypherpunks__I_eleutheria_kai_to_mellon_tou_diadiktuou__J__Assange____.jpg', 'Cypherpunks Η ελευθερία και το μέλλον του διαδικτύου', '', 2, 4, 1, '', '', 0000, 13, 'ιντερνετ, ελευθερία', 0, '', 'ββββββββ', 3, 0, 1561414625),
(4, 'GKOYΑNTΑNΑMO___TO_IMEROLOGIO_ENOS_KRΑTOYMENOY___MOChΑMENTOY_OYLNT____.jpg', 'Γκουαντάναμο', '', 15, 17, 1, '', '', 0000, 14, 'φυλακές, ΗΠΑ', 0, 'ννν', 'μμμμ', 2, 0, 1561414730),
(5, 'TO_KEFΑLΑIO_B_TOMOS___MΑRX_KΑRL___Oikonomia___IANOS_gr.jpg', 'Το κεφάλαιο', '', 16, 18, 1, '', '', 0000, 17, 'οικονομία', 0, 'βββ', 'δδδ', 1, 0, 1561414819),
(6, 'I_krisi_ton_diktatorion___Bivlia_Public.jpg', 'Η Κρίση των δικτατοριών', '', 17, 19, 1, '', '', 0000, 16, 'δικτατορία', 0, '', '', 0, 0, 1561814183),
(7, 'O_epanastatimenos_anthropos___Camus_Albert___Public_vivlia.jpg', 'Ο επαναστατημένος άνθρωπος', '', 18, 20, 1, '', '', 0000, 57, '', 0, '', '', 0, 0, 1561814244),
(8, 'Kratos_kai_Epanastasi___Αlfeios.jpg', 'Κράτος και επανάσταση', '', 23, 18, 1, '', '', 0000, 18, 'πολιτική φιλοσοφία', 0, '', '', 2, 0, 1561814295),
(10, 'To_kratos__i_exousia__o_sosialismos___Ekdoseis_Themelio.jpg', 'Το κράτος η εξουσία ο σοσιαλισμός', '', 17, 27, 1, '', '', 0000, 0, '', 0, '', '', 2, 0, 1562177871),
(11, 'Oi_koinonikes_taxeis_ston_sughrono_kapitalismo___Ekdoseis_Themelio.jpg', 'Οι κοινωνικές τάξεις στον σύγχρονο καπιταλισμό', '', 17, 27, 1, '', '', 0000, 0, '', 0, '', '', 2, 0, 1562177958),
(12, 'I_grafeiokratiki_koinonia_I___Kornilios_Kastoriadis____.jpg', 'Η γραφειοκρατική κοινωνία 1', '', 29, 25, 1, '', '', 0000, 0, '', 0, '', '', 2, 0, 1562178023),
(14, 'Korufaio_ekdotiko_gegonos__Dorean_me_To_Bima_tis_Kuriakis_gia____.jpg', 'Ιστορία της Φιλοσοφίας τόμος Α', '', 32, 24, 1, '', '', 0000, 1, '', 0, '', '', 2, 0, 1570522034),
(15, 'Ouggriki_epanastasi_1956___oktaimerobooks_gr.jpg', 'Ούγγρικη Επανάσταση 1956', '', 29, 25, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571464066),
(18, 'Yparhei_sosialistiko_montelo_anaptuxis__Skepseis_pano_stin_anaptuxi____.jpg', 'Υπάρχει σοσιαλιστικό μοντέλο ανάπτυξης;', '', 29, 25, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571465221),
(19, 'Mprosta_ston_Polemo___upsilon___vivlia.jpg', 'Μπροστά στον πόλεμο', '', 29, 25, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571465383),
(20, 'O_SYGChRONOS_ΑNThROPOS___PΑNΑGIOTOPOYLOS_I_M____Filosofia___IANOS_gr.jpg', 'Ο σύγχρονος άνθρωπος', '', 37, 35, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571465563),
(21, 'I_koinonia_tou_anthropou__Eisagogi_stin_koinoniologia___Αlfeios.jpg', 'Η κοινωνία του ανθρώπου', '', 38, 36, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571466042),
(22, NULL, 'Απλά μαθήματα κοινωνιολογίας', '', 39, 37, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571466255),
(23, 'OPsEIS_TIS_DIΑTIRISIS_KΑI_TIS_METΑBOLIS_TOY_KOINONIKOY_SYSTIMΑTOS____.jpg', 'Όψεις της διατήρησης και της μεταβολής του κοινωνικού συστήματος Τόμος Α', '', 40, 38, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571466469),
(49, 'OPsEIS_TIS_DIΑTIRISIS_KΑI_TIS_METΑBOLIS_TOY_KOINONIKOY_SYSTIMΑTOS____.jpg', 'Όψεις της διατήρησης και της μεταβολής του κοινωνικού συστήματος τόμος Β', '', 40, 38, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571481270),
(50, 'Bookstars____Koinoniologia_Koinonia_Kai_Koinoniki_Zoi____Used____.jpg', 'Κοινωνιολογία', '', 42, 40, 1, '', '', 0000, 48, '', 0, '', '', 0, 0, 1571481429),
(51, 'KAROUSOS_ART_CRITICS__ISTORIΑ_TIS_ROSIΑS_apo_ton_korufaio_meletiti____.jpg', 'Ιστορία της Ρωσίας', '', 43, 41, 1, '', '', 0000, 56, '', 0, '', '', 0, 0, 1571482441),
(52, NULL, 'Πολιτικά Κείμενα', '', 44, 42, 1, '', '', 0000, 29, '', 0, '', '', 0, 0, 1571482514),
(53, 'socialismfrombelow.jpg', 'Το μανιφέστο του κομμουνιστικού κόμματος', '', 45, 27, 1, '', '', 0000, 17, '', 0, '', '', 0, 0, 1571482555),
(54, 'I_MΑRXISTIKI_ThEORIΑ_TIS_ISTORIΑS___SKLΑBOS_KOSTΑS___Istoria___IANOS_gr.jpg', 'Η μαρξιστική θεωρία της ιστορίας', '', 46, 27, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482594),
(55, 'Frahtes_kai_parathura_Αϊ_sto_diaolo__DNT___TO_PONTIKI.jpg', 'Φράχτες και Παράθυρα', '', 47, 38, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482647),
(56, 'POETRY_BAR__Naomi_Klein___To_Dogma_tou_Sok.jpg', 'Το δόγμα του σοκ', '', 47, 38, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482675),
(57, 'No_logo___Naomi_Klein___9789601411316___Protoporia_gr.jpg', 'No logo', '', 47, 38, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482702),
(58, 'XENI_LOGOTEChNIΑ__Zantigk_i_To_pepromeno___www_dodonipublications_gr.jpg', 'Ζαντίγκ ή το πεπρωμένο', '', 48, 3, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482734),
(59, 'BAZAAR_ΑLLON_EKDOSEON__Αrhes_Politikis_Epistimis_kai_stoiheia_tou____.jpg', 'Αρχές πολιτικής επιστήμης και στοιχεία δημοκρατικού πολιτεύματος', '', 49, 37, 1, '', '', 0000, 53, '', 0, '', '', 0, 0, 1571482779),
(60, NULL, 'Το Σύνταγμα της Ευρώπης', '', 0, 43, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571482828),
(61, 'I_GENESIS_TIS_TRΑGODIΑS___NIETZSCHE_FRIEDRICH.jpg', 'Η Γέννεσις της τραγωδίας', '', 1, 44, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483048),
(62, 'To_Koinoniko_Sumvolaio__Zan_Zak_Rousso__metabook__Metaheirismena____.jpg', 'Το κοινωνικό συμβόλαιο', '', 50, 0, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483115),
(63, 'Untitled.jpg', 'Η εποχή της περιφρόνησης', '', 51, 25, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483144),
(64, 'MIDENISMOS_KΑI_ΑMFISBITISI___LEFEBR_ΑNRI___BIBLIO___Greekbooks_gr.jpg', 'Μηδενισμός και αμφισβήτηση', '', 51, 25, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483169),
(65, 'Gkagkarin__«Αristerismos__i_paidiki_arrostia_tou_kommounismou».jpg', 'Ο Αριστερισμός παιδική αρρώστια του κομμουνισμού', '', 23, 18, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483238),
(66, 'ΑPO_TON_20o_STON_21o_ΑIONΑ___KONDYLIS_PΑNΑGIOTIS___Politiki___IANOS_gr.jpg', 'Από τον 20ο στον 21ο αιώνα', '', 53, 27, 1, '', '', 0000, 58, '', 0, '', '', 0, 0, 1571483347),
(67, 'Einai_o_kapitalismos__ilithie_.jpg', 'Είναι ο καπιταλισμός ηλίθιε', '', 54, 38, 1, '', '', 0000, 19, '', 0, '', '', 0, 0, 1571483375),
(68, 'Noam_Chomsky___Occupy___mybook_gr.jpg', 'Occupy', '', 55, 45, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483405),
(69, 'POIOS_KYBERNΑ_TON_KOSMO____CHOMSKY_NOAM.jpg', 'Ποιος κυβερνά τον κόσμο', '', 55, 20, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483439),
(70, NULL, 'Φαντασίωση και Φαντασία', '', 56, 46, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483468),
(71, 'I_KOINONIΑ_TOY_ThEΑMΑTOS___NTEMPOR_GKY___Koinonikes_Epistimes____.jpg', 'Η κοινωνία του θεάματος', '', 57, 47, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483500),
(72, 'POS_NΑ_ΑLLΑXOYME_TON_KOSMO___HOBSBAWM_J__ERIC.jpg', 'Πώς να αλλάξουμε τον κόσμο', '', 58, 27, 1, '', '', 0000, 57, '', 0, '', '', 0, 0, 1571483533),
(73, 'books__diava_zoume_vivlia_gnosis_kai_epignosis_giati_i_gnosi_einai____.jpg', 'Θεός και κράτος', '', 59, 43, 1, '', '', 0000, 28, '', 0, '', '', 0, 0, 1571483640),
(74, 'Book_capacitor__To_kratos_kai_o_istorikos_tou_rolos.jpg', 'το κράτος και ο ιστορικός του ρόλος', '', 60, 43, 1, '', '', 0000, 28, '', 0, '', '', 0, 0, 1571483675),
(75, 'Istoria_tis_Αnarhias_by_Max_Nettlau.jpg', 'Ιστορία της Αναρχίας', '', 61, 47, 1, '', '', 0000, 28, '', 0, '', '', 0, 0, 1571483721),
(76, 'KOLLEKTIBISMOS_KΑI_ΑYTODIΑChEIRISI_STIN_ISPΑNIΑ_1936_39___PlanetBooks.jpg', 'Κολλεκτιβισμός και αυτοδιαχείριση', '', 62, 43, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483755),
(77, 'I_KΑTΑGOGI_TON_EIDON_Α__TOMOS___maryrose_gr.jpg', 'Η καταγωγή των ειδών', '', 63, 48, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483782),
(78, 'I_GENIKI_ThEORIΑ_TIS_ΑPΑSChOLISIS__TOY_TOKOY_KΑI_TOY_ChRIMΑTOS____.jpg', 'Η γενική θεωρία της απασχόλησης του τόκου και του χρήματος', '', 64, 48, 1, '', '', 0000, 40, '', 0, '', '', 0, 0, 1571483814),
(79, 'Milontas_stin_kori_mou_gia_tin_oikonomia_Baroufakis_Gianis_Patakis.jpg', 'Μιλώντας στην κόρη μου για την οικονομία', '', 65, 20, 1, '', '', 0000, 40, '', 0, '', '', 0, 0, 1571483846),
(80, 'Krisis_Lexilogio_–_Yanis_Varoufakis.jpg', 'Κρίσης Λεξιλόγιο', '', 65, 49, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483866),
(81, NULL, 'Μια μετριοπαθής πρόταση για την επίλυση της κρίσης του ευρώ', '', 65, 49, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571483902),
(82, 'Oi_Αlvanoi_by_Miranda_Vickers.jpg', 'Οι αλβανοί', '', 69, 42, 1, '', '', 0000, 56, '', 0, '', '', 0, 0, 1571483929),
(83, 'ISTORIΑ_TOY_LΑOY_TON_INOMENON_POLITEION___ZINN_HOWARD.jpg', 'Ιστορία του λαού των ηνωμένων πολιτειών', '', 67, 41, 1, '', '', 0000, 56, '', 0, '', '', 0, 0, 1571483962),
(84, 'Henry_Kissinger___Όla_ta_Bivlia___Skroutz_gr.jpg', 'Διπλωματία', '', 68, 38, 1, '', '', 0000, 55, '', 0, '', '', 0, 0, 1571483987),
(85, NULL, 'Σχολική Βία', '', 70, 48, 1, '', '', 0000, 44, '', 0, '', '', 3, 0, 1571495784),
(86, 'Όtan_eklapse_o_Nitse__Irvin_D__Yalom___Skroutz_gr.jpg', 'Όταν έκλαψε ο Νίτσε', '', 71, 50, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571500180),
(87, 'P_E_SO_Ps____Dialektikos_ulismos_kai_psuhanalusi.jpg', 'Διαλεκτικός υλισμός και ψυχανάλυση', '', 72, 43, 1, '', '', 0000, 54, '', 0, '', '', 0, 0, 1571500484),
(88, 'PsYChOLOGIΑ_B´_TΑXI_GENIKOY_LYKEIOY_MΑRIΑ_NΑSIΑKOY__OLGΑ_MΑRΑTOY____.jpg', 'Ψυχολογία Β\' τάξη Γενικού Λυκείου', '', 73, 37, 1, '', '', 0000, 0, '', 0, '', '', 3, 0, 1571500551),
(89, '.jpg', 'Κοινωνική Ψυχολογία Τόμος Α', '', 74, 0, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571500688),
(90, '9e0ab15b15119020590433363780cebf.jpg', 'Κοινωνική Ψυχολογία Τόμος Β', '', 74, 0, 1, '', '', 0000, 0, '', 0, '', '', 3, 0, 1571500866),
(91, '0eec27d3c45b03833865c702e0976fd8.jpg', 'Διασχίζοντας τα σύνορα', '', 75, 51, 1, '', '', 0000, 33, '', 0, '', '', 0, 0, 1571500911),
(92, '0cf71c47c7fab40d830ffcf4c7b9e723.jpg', 'Ο φόβος δυναμώνει τα παιδιά ', '', 76, 52, 1, '', '', 0000, 44, '', 0, '', '', 0, 0, 1571500984),
(93, 'PΑIDΑGOGIKΑ_DIDΑKTIKI__Suntomo_ermineutiko_lexiko_psuhologikon_oron____.jpg', 'Σύντομο Ερμηνευτικό Λεξικό Ψυχολογικών Όρων', '', 77, 3, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501035),
(94, '4e41df911b8f4d9ab41012bc6939eb6b.jpg', 'ΧΥ Η ανδρική ταυτότητα', '', 78, 53, 1, '', '', 0000, 0, '', 0, '', '', 3, 0, 1571501101),
(95, 'fa17a32208dbc6c7364336a6b23ca8fc.jpg', 'Νικήστε τις φοβίες', '', 79, 54, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571501144),
(96, 'a41af949ae3f066b4d1838d864c2bd56.jpg', 'Τέχνη και ψυχανάλυση', '', 80, 55, 1, '', '', 0000, 0, '', 0, '', '', 0, 0, 1571501186),
(97, 'a34970fbcd40ba92a224af49a02a4518.jpg', 'Τέσσερα Αρχέτυπα', '', 81, 56, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571501244),
(98, NULL, 'Εισαγωγή στην ψυχανάλυση', '', 80, 57, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571501353),
(99, '0d7bb1c78ae7d01fd54692238b21793b.jpg', 'Τετραλογία του Φόβου', '', 82, 0, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501421),
(100, NULL, 'Ψυχολογικοί τύποι 1ος τόμος', '', 81, 58, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571501474),
(101, NULL, 'Ψυχολογικοί τύποι 2ος τόμος ', '', 81, 58, 1, '', '', 0000, 54, '', 0, '', '', 0, 0, 1571501511),
(102, 'e082514357baf4e65851b7bf455878b5.jpg', 'Κοινωνική ψυχολογία', '', 83, 59, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501571),
(103, '74e87d607b11d04e04fc3370a43060cf.jpg', 'Η γλώσσα του προσώπου', '', 84, 60, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501623),
(104, 'Bivlia__I_erotiki_glossa_tou_somatos.jpg', 'Η ερωτική γλώσσα του σώματος', '', 85, 60, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501670),
(105, 'a4bf462b9159dd9613c1bced298beddd.jpg', 'Η γλώσσα του σώματος', '', 86, 60, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501730),
(106, NULL, 'Το ένστικτο του θανάτου', '', 72, 61, 1, '', '', 0000, 0, '', 0, '', '', 3, 0, 1571501833),
(107, 'Exeliktiki_Psuhologia__Tomos_3___Ioannis_Paraskeuopoulos__metabook____.jpg', 'Εξελικτική ψυχολογία τόμος 3', '', 87, 0, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501883),
(108, 'I_PsYChI_TIS_GYNΑIKΑS___Carotenuto__Aldo___Evripidis_gr.jpg', 'Η ψυχή της γυναίκας ', '', 88, 62, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571501950),
(109, 'fac58aa65591a4fb1a9b518419513f14.jpg', 'Encore', '', 89, 17, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571502006),
(110, '4c7ee4662ac7da2abe9cab1669bc193b.jpg', 'Το σεμινάριο', '', 89, 45, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571502038),
(111, 'f6ce969ef8bfdafc0a17d36f66cb6582.jpg', 'Ψυχανάλυση στο θέατρο', '', 72, 63, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571502073),
(112, '03d8db88f28c0aaf1fd0b64b89eaedba.jpg', 'Αναλυόμενος και αναλυτής', '', 90, 64, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571502121),
(113, '8799f9d45f50f6949bbd7bf7844fbd05.jpg', 'Η ερμηνεία των ονείρων', '', 80, 65, 1, '', '', 0000, 31, '', 0, '', '', 3, 0, 1571502161),
(114, 'f3c61a79dc74702c762f8ceb393a31e7.jpg', 'Ο πολιτισμός πηγή δυστυχίας', '', 80, 65, 1, '', '', 0000, 54, '', 0, '', '', 3, 0, 1571502195),
(115, '0448770cdda79e18a2c6bad2290319ac.jpg', 'Θεωρία του πολέμου', '', 53, 27, 1, '', '', 0000, 53, '', 0, '', '', 3, 0, 1571502353),
(116, 'fc9fad66ec5dd149fcbf62de074530a9.jpg', 'Αρχαίες θρησκείες και χριστιανισμός', '', 91, 66, 1, '', '', 0000, 15, '', 0, '', '', 3, 0, 1571502395),
(117, 'eee60f8138f5f2301f4425b967a06e0e.jpg', 'Η γοητεία των παραμυθιών', '', 92, 67, 1, '', '', 0000, 50, '', 0, '', '', 3, 0, 1571502436),
(118, 'bec40f331ad5e3d2cf1c7f6d7ff08d95.jpg', 'Μετανάστες και μειονότητες', '', 93, 68, 1, '', '', 0000, 33, '', 0, '', '', 3, 0, 1571502495),
(119, 'd3737656de2ae53973ddbdd4c4f32159.jpg', 'Παιδιά μεταναστών σε Ελλάδα και Κύπρο', '', 94, 69, 1, '', '', 0000, 33, '', 0, '', '', 3, 0, 1571502540),
(120, 'ef2275ab863c699c34c3e54ef952d507.jpg', 'Vaccine whistleblower', '', 95, 0, 1, '', '', 0000, 49, '', 0, '', '', 0, 0, 1571502585),
(121, 'Έna_manifesto_ton_haker__McKenzie_Wark___Skroutz_gr.jpg', 'Ένα μανιφέστο των χάκερ', '', 96, 70, 1, '', '', 0000, 30, '', 0, '', '', 3, 0, 1571502628),
(122, NULL, 'Εγκληματικότητα ενηλίκων', '', 97, 71, 1, '', '', 0000, 47, '', 0, '', '', 3, 0, 1571502703),
(123, 'Paidia_kai_efivoi_me_eidikes_anagkes_kai_dunatotites_Tomos_Α____.jpg', 'Παιδιά και έφηβοι με ειδικές ανάγκες και δυνατότητες', '', 98, 0, 1, '', '', 0000, 45, '', 0, '', '', 0, 0, 1571502748),
(124, '6b6707bdb1da47a33155d93544ea0561.jpg', 'Άλλη λογική', '', 99, 72, 1, '', '', 0000, 44, '', 0, '', '', 0, 0, 1571502778),
(125, '740223a46e65c3454f5e982d88068526.jpg', 'Εκπαίδευση στα ΜΜΕ', '', 100, 24, 1, '', '', 0000, 43, '', 0, '', '', 0, 0, 1571502810),
(126, 'SYNDROMO_ASPERGER___ATTWOOD_TONY.jpg', 'Σύνδρομο Asperger', '', 101, 73, 1, '', '', 0000, 45, '', 0, '', '', 3, 0, 1571502846),
(127, '3c6c4f860beb48862f6cbc79c1b30aff.jpg', 'Αδήλωτη απασχόληση και \"νομιμοποίηση\" των μεταναστών', '', 102, 74, 1, '', '', 0000, 33, '', 0, '', '', 3, 0, 1571502905),
(128, '6d3435b5cf04f7009db25a9a597e7f1b.jpg', 'Μικρό ημερολόγιο συνόρων', '', 103, 38, 1, '', '', 0000, 33, '', 0, '', '', 3, 0, 1571502942),
(129, 'POIIMΑTΑ__TOMOS_Α___1930_1942_GIΑNNIS_RITSOS____Έrga___Ekdoseis____.jpg', 'Ποιήματα Α', '', 104, 45, 1, '', '', 0000, 37, '', 0, '', '', 3, 0, 1572030816),
(130, 'TO_MONOGRΑMMΑ___ELYTIS_ODYSSEΑS___Logotehnia___IANOS_gr.jpg', 'Το μονόγραμμα', '', 105, 75, 1, '', '', 0000, 37, '', 0, '', '', 0, 0, 1572031515),
(131, 'ELLINES_POIITES_GIΑ_TI_ThΑLΑSSΑ_ΑNThOLOGISI__21_639P_.jpg', 'Έλληνες ποιητές για τη θάλασσα', '', 106, 61, 1, '', '', 0000, 37, '', 0, '', '', 0, 0, 1572031553),
(132, 'ΑPΑNTΑ_TΑ_ELLINIKΑ_ERGΑ___pixelbooks.jpg', 'Άπαντα τα ελληνικά έργα', '', 107, 76, 1, '', '', 0000, 37, '', 0, '', '', 0, 0, 1572031612),
(133, 'TO_TRΑGOYDI_TOY_EΑYTOY_MΑS___CD____TSΑMΑNTΑKIS_GIΑNNIS___Tehnes____.jpg', 'Το τραγούδι του εαυτού μας', '', 108, 77, 1, '', '', 0000, 37, '', 0, '', '', 0, 0, 1572031661),
(134, 'Bivlia_apo_tis_ekdoseis_Tria_Fulla_sto_Bibliohora_gr___Provoli____.jpg', 'τα ποιήματα A', '', 109, 78, 1, '', '', 0000, 37, '', 0, '', '', 0, 0, 1572031687);

-- --------------------------------------------------------

--
-- Table structure for table `cat`
--

CREATE TABLE `cat` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `parent` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `name` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cat`
--

INSERT INTO `cat` (`id`, `parent`, `name`) VALUES
(1, 0, 'φιλοσοφία'),
(13, 30, 'διαδίκτυο'),
(14, 25, 'ανθρώπινα δικαιώματα'),
(15, 0, 'πολιτική'),
(17, 15, 'πολιτική φιλοσοφία'),
(19, 15, 'πολιτικά κείμενα'),
(23, 0, 'επιστήμες'),
(24, 23, 'μαθηματικά'),
(25, 0, 'κοινωνικές επιστήμες'),
(26, 0, 'τέχνη'),
(27, 26, 'θέατρο'),
(28, 17, 'αναρχία'),
(29, 17, 'μαρξισμός'),
(30, 0, 'τεχνολογία'),
(31, 0, 'ψυχολογία'),
(32, 26, 'μουσική'),
(33, 25, 'μετανάστευση'),
(35, 0, 'ιστορία'),
(36, 38, 'πεζογραφία'),
(37, 38, 'ποίηση'),
(38, 0, 'λογοτεχνία'),
(39, 26, 'κινηματογράφος'),
(40, 0, 'οικονομικά'),
(41, 0, 'προγραμματισμός'),
(43, 0, 'ΜΜΕ'),
(44, 46, 'παιδαγωγική'),
(45, 46, 'ειδικά παιδιά'),
(46, 0, 'παιδιά'),
(47, 25, 'εγκληματολογία'),
(48, 25, 'κοινωνιολογία'),
(49, 0, 'υγεία'),
(50, 38, 'παραμύθια'),
(51, 0, 'μύθοι'),
(52, 27, 'αγγλικό θέατρο'),
(53, 15, 'πολιτική θεωρία'),
(54, 0, 'ψυχανάλυση'),
(55, 15, 'διπλωματία'),
(56, 35, 'ιστορία χωρών'),
(57, 15, 'πολιτικό δοκίμιο');

-- --------------------------------------------------------

--
-- Table structure for table `editor`
--

CREATE TABLE `editor` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `editor`
--

INSERT INTO `editor` (`id`, `img`, `name`) VALUES
(3, '', 'Δωδώνη'),
(4, '', 'Ποιότητα'),
(17, 'Affiliate_Marketing__17___Psuhogios___iArk_Social_Media_&_Digital____.jpg', 'Ψυχογιός'),
(18, 'Αrhiki_selida___Sughroni_Epohi_Ekdotiki_ΑEBE.jpg', 'Σύγχρονη Εποχή'),
(19, 'Bivliopoleio_Themelio___330_Photos___48_Reviews___Office_Supplies____.jpg', 'Εκδόσεις Θεμέλιο'),
(20, 'O_Stefanos_Patakis_gia_ton_EFKΑ_stous_pneumatikous_dimiourgous.jpg', 'Πατάκης'),
(22, '', 'Νησίδες'),
(24, NULL, 'Ελληνικά Γράμματα'),
(25, NULL, 'Ύψιλον'),
(27, NULL, 'Θεμέλιο'),
(35, NULL, 'Οι εκδόσεις των φιλων'),
(36, NULL, 'Gutenberg'),
(37, NULL, 'ΟΕΔΒ'),
(38, NULL, 'Λιβάνης'),
(40, NULL, 'Σταμούλης'),
(41, NULL, 'Αιώρα'),
(42, NULL, 'Οδυσσέας'),
(43, NULL, 'Ελεύθερος τύπος'),
(44, NULL, 'Φέξη'),
(45, NULL, 'Κέδρος'),
(46, NULL, 'Ερμής'),
(47, NULL, 'Διεθνής Βιβλιοθήκη'),
(48, NULL, 'Το βήμα'),
(49, NULL, 'ποταμός'),
(50, NULL, 'Άγρα'),
(51, NULL, 'Βαβέλ'),
(52, NULL, 'Θυμάρι'),
(53, NULL, 'Κάτοπτρο'),
(54, NULL, 'Μέδουσα'),
(55, NULL, 'Κοροντζής'),
(56, NULL, 'Ιάμβλιχος'),
(57, NULL, 'Γκοβόστης'),
(58, NULL, 'Σπαγείρια'),
(59, NULL, 'Ζαχαρόπουλος'),
(60, NULL, 'Έσοπτρον'),
(61, NULL, 'Καστανιώτης'),
(62, NULL, 'ίταμος'),
(63, NULL, 'Πύλη'),
(64, NULL, 'Πρίσμα'),
(65, NULL, 'Επίκουρος'),
(66, NULL, 'Μπουκουμάνης'),
(67, NULL, 'Γλάρος'),
(68, NULL, 'Βιβλιόραμα'),
(69, NULL, 'Επίκεντρο'),
(70, NULL, 'Scripta'),
(71, NULL, 'Νομική Βιβλιοθήκη'),
(72, NULL, 'Εν πλω'),
(73, NULL, 'Πεδίο'),
(74, NULL, 'ΙΝΕ'),
(75, NULL, 'Ίκαρος'),
(76, NULL, 'Πάπυρος'),
(77, NULL, 'Όταν'),
(78, NULL, 'τρία φύλλα');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `writer`
--

CREATE TABLE `writer` (
  `id` mediumint(10) UNSIGNED NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `summary` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `writer`
--

INSERT INTO `writer` (`id`, `img`, `name`, `summary`) VALUES
(1, 'Frintrih_Nitse___Bikipaideia.jpg', 'Φρίντριχ Νίτσε', NULL),
(2, 'Julian_Assange_shows_symptoms_of_psychological_torture__UN_expert____.jpg', 'Julian Assange', NULL),
(15, 'MOChΑMENTOY_OYLNT_SLΑChI___Psichogios_Publications.jpg', 'Μοχαμέντου Ουλντ Σλαχί', NULL),
(16, 'Biografies___Karl_Marx.jpg', 'Καρλ Μαρξ', NULL),
(17, 'NIKOS_POYLΑNTZΑS__3_Oktovriou_1979___ert_gr.jpg', 'Νίκος Πουλαντζάς', NULL),
(18, 'Αlmper_Kamu__Eleutheros_einai_ekeinos_pou_mporei_na_zei_horis_na____.jpg', 'Άλμπερ Καμύ', NULL),
(20, 'Erriko_Malatesta___Bikipaideia.jpg', 'Ερικο Μαλατέστα', NULL),
(23, 'Biografies___Blantimir_Lenin.jpg', 'Βλαντιμίρ Λένιν', NULL),
(29, 'Kornilios_Kastoriadis__o_filosofos_tis_autonomias____left_gr.jpg', 'Κορνήλιος Καστοριάδης', NULL),
(32, NULL, 'Ουμπέρτο Έκο', NULL),
(37, NULL, 'Ι.Μ. Παναγιωτόπουλος', NULL),
(38, NULL, 'Δ.Γ. Τσαούσης', NULL),
(39, NULL, 'Βίκα Γκιζελή', NULL),
(40, NULL, 'Βασίλης Φίλιας', NULL),
(42, NULL, 'Λίτσα Νικολάου Σμοκοβίτη', NULL),
(43, NULL, 'Paul Bushkovitch', NULL),
(44, NULL, 'Αντόμιο Γκράμσι', NULL),
(45, NULL, 'Καρλ Μάρξ - Φρίντριχ Ένγκελς', NULL),
(46, NULL, 'Κώστας Σκλάβος', NULL),
(47, NULL, 'Naomi Klein', NULL),
(48, NULL, 'Βολταίρος', NULL),
(49, NULL, 'Δημήτρης Αποστολόπουλος', NULL),
(50, NULL, 'Ζαν Ζακ Ρουσσώ', NULL),
(51, NULL, 'Ανρί Λεφέβρ', NULL),
(53, NULL, 'Παναγιώτης Κονδύλης', NULL),
(54, NULL, 'Νίκος Μπογιόπουλος', NULL),
(55, NULL, 'Noam Chomsky', NULL),
(56, NULL, 'R.L. Brett', NULL),
(57, NULL, 'Guy Debord', NULL),
(58, NULL, 'Eric Hobsbawm', NULL),
(59, NULL, 'Μ. Μπακούνιν', NULL),
(60, NULL, 'Πέτρος Κροπότκιν', NULL),
(61, NULL, 'Max Nettlau', NULL),
(62, NULL, 'Αουγκούστιν Σούχυ', NULL),
(63, NULL, 'Charles Darwin', NULL),
(64, NULL, 'John Maynard Keynes', NULL),
(65, NULL, 'Γιάνης Βαρουφάκης', NULL),
(66, NULL, 'Οι αλβανοί', NULL),
(67, NULL, 'Howard Zinn', NULL),
(68, NULL, 'Henry Kissinger', NULL),
(69, NULL, 'Miranda Vickers', NULL),
(70, NULL, 'Ελένη Δ. Τρίγκα Μερτίκα', NULL),
(71, NULL, 'Irvin D. Yalom', NULL),
(72, 'Bilhelm_Raih___Bikipaideia.jpg', 'Βίλχελμ Ράιχ', NULL),
(73, NULL, 'Μαρία Νασιάκου', NULL),
(74, NULL, 'Δημήτριος Γεώργας', NULL),
(75, NULL, 'Νίκος Γκιωνάκης', NULL),
(76, NULL, 'Jan-Uwe Rogge', NULL),
(77, NULL, 'Αναστασία Χουντουμάδη', NULL),
(78, NULL, 'Elisabeth Badinter', NULL),
(79, NULL, 'Isaak M. Marks', NULL),
(80, NULL, 'Σίγκμουντ Φρόυντ', NULL),
(81, NULL, 'Carl G. Jung', NULL),
(82, NULL, 'Fritz Riemann', NULL),
(83, NULL, 'Jean Maisanneuve', NULL),
(84, NULL, 'Rodney Davies', NULL),
(85, NULL, 'David Cohen', NULL),
(86, NULL, 'Allan Pease', NULL),
(87, NULL, 'Ιωάννης Παρασκευόπουλος', NULL),
(88, NULL, 'Aldo Carotenuto', NULL),
(89, 'ZΑK_LΑKΑN___Psichogios_Publications.jpg', 'Ζακ Λακάν', NULL),
(90, NULL, 'Γ. Σάντλερ', NULL),
(91, NULL, 'Γιάννης Κοδράτος', NULL),
(92, NULL, 'Μπρούνο Μπέτελχάιμ', NULL),
(93, NULL, 'Μίλτος Παύλου', NULL),
(94, NULL, 'Δέσπω Κυπριανού', NULL),
(95, NULL, 'Kevin Barry', NULL),
(96, NULL, 'Mc Kenzie Wark', NULL),
(97, NULL, 'Ανθοζωή Χάιδου', NULL),
(98, NULL, 'Σ. Πολυχρονοπούλου', NULL),
(99, NULL, 'Ken Robinson', NULL),
(100, NULL, 'David Buckingham', NULL),
(101, NULL, 'Tony Attwood', NULL),
(102, NULL, 'Απόστολος Καψάλης', NULL),
(103, 'Beli»_tou_dimosiografou_Gkazment_Kaplani_kata_Tsipra_gia_tin____.jpg', 'Γκάζμεντ Καπλάνι', NULL),
(104, NULL, 'Γιάννης Ρίτσος', NULL),
(105, NULL, 'Οδυσσέας Ελύτης', NULL),
(106, NULL, 'Αντώνης Φωστιέρης', NULL),
(107, NULL, 'Διονύσιος Σολωμός', NULL),
(108, NULL, 'Γιάννης Τσαμαντάκης', NULL),
(109, NULL, 'Νικηφόρος Βρεττάκος', NULL),
(110, NULL, 'Robert O. Paxton', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `writer` (`writer`),
  ADD KEY `cat` (`cat`),
  ADD KEY `editor` (`editor`);

--
-- Indexes for table `cat`
--
ALTER TABLE `cat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editor`
--
ALTER TABLE `editor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `writer`
--
ALTER TABLE `writer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'auto', AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `cat`
--
ALTER TABLE `cat`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `editor`
--
ALTER TABLE `editor`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `writer`
--
ALTER TABLE `writer`
  MODIFY `id` mediumint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
