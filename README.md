# Wikipath

> Jeu de navigation Wikipedia — reliez deux articles en un minimum de clics.

---

## 1. Objectif

Wikipath est un jeu de navigation inspiré de WikiRace. Le joueur part d'un article Wikipedia et doit rejoindre un article cible en cliquant uniquement sur les liens internes des pages. L'objectif : trouver le chemin le plus court possible.

Deux modes disponibles :
- **Exploration** — navigation libre avec retour en arrière autorisé
- **Contre-la-montre** — timer activé, chaque seconde compte

---

## 2. Besoin

Rendre la découverte de Wikipedia ludique et addictive. Le jeu exploite la structure naturelle des liens entre articles pour créer un défi cognitif : comment passer de *Napoléon Bonaparte* à *Internet* en 4 clics ?

---

## 3. Stack technique

- **HTML / CSS / JavaScript vanilla** — zéro framework, zéro dépendance
- **API REST Wikipedia** (`fr.wikipedia.org/api/rest_v1`) — chargement des articles et résolution des titres canoniques
- **API OpenSearch Wikipedia** — autocomplétion de la recherche d'articles
- **Netlify** — hébergement statique

---

## 4. Outils IA utilisés

| Outil | Usage |
|-------|-------|
| **Claude (claude.ai)** | Génération et itération du code complet, design éditorial, architecture de la logique de jeu, correction de bugs |
| **Claude Code** | Refactoring, debugging en CLI, modifications ciblées sur des fichiers |
| **Antigravity** | [Compléter avec ton usage] |

---

## 5. Exemples de prompts

*(à compléter avec tes prompts)*

---

## 6. Défis rencontrés

**Résolution des titres canoniques Wikipedia**
Wikipedia redirige silencieusement certains titres (ex : "Usa" → "États-Unis"). Sans résolution explicite via l'API summary au démarrage de la partie, la condition de victoire ne se déclenchait jamais. Solution : résoudre les deux titres (départ et cible) en parallèle via `Promise.all` avant de lancer la partie.

**Injection CSS dans une iframe cross-origin**
Les pages Wikipedia sont chargées via l'API HTML et injectées en `srcdoc` pour contourner les restrictions CORS. Le thème sombre/clair est appliqué dynamiquement en injectant une balise `<style>` dans le HTML avant de l'assigner à l'iframe.

**Interception des clics de navigation**
Les liens Wikipedia dans l'iframe déclencheraient une navigation normale. Un script est injecté dans chaque page pour intercepter les clics et les transmettre à la page parente via `window.parent.postMessage`, permettant au jeu de contrôler entièrement la navigation.

**Filtrage des namespaces Wikipedia**
Les liens Wikipedia incluent des namespaces non-articles (Aide:, Catégorie:, Portail:, etc.). Tous les liens contenant `:` sont filtrés pour ne garder que les vrais articles.

---

## 7. Application hébergée

🔗 [à compléter]

---

## 8. Repo GitHub

🔗 [à compléter]

---

*Projet réalisé dans le cadre du projet transversal — rendu le 12 avril 2026*