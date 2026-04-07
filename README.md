# Wikipath

> Jeu de navigation Wikipedia — reliez deux articles en un minimum de clics.

---

## 1. Objectif

Wikipath est un jeu de navigation inspiré de WikiRace. Le joueur part d'un article Wikipedia et doit rejoindre un article cible en cliquant uniquement sur les liens internes des pages. L'objectif : trouver le chemin le plus court possible.

Quatre modes disponibles :
- **Exploration** — navigation libre avec retour en arrière autorisé
- **Contre-la-montre** — timer activé, chaque seconde compte, battez votre record
- **Survie** — 60 secondes maximum, chaque clic rapporte +10 secondes
- **Défi du jour** — une paire identique pour tous les joueurs chaque jour, avec système de streak

---

## 2. Besoin

Rendre la découverte de Wikipedia ludique et addictive. Le jeu exploite la structure naturelle des liens entre articles pour créer un défi cognitif : comment passer de *Napoléon Bonaparte* à *Internet* en 4 clics ?

---

## 3. Stack technique

- **HTML / CSS / JavaScript vanilla** — zéro framework, zéro dépendance
- **API REST Wikipedia** (`fr.wikipedia.org/api/rest_v1`) — chargement des articles et résolution des titres canoniques
- **API OpenSearch Wikipedia** — autocomplétion de la recherche d'articles
- **Nginx** — serveur web statique auto-hébergé sur un hyperviseur Proxmox
- **Cloudflare** — reverse proxy, protection DDoS, certificat SSL
- **Firewall géo-restreint** — seules les connexions depuis la France sont autorisées

---

## 4. Outils IA utilisés

| Outil | Usage |
|-------|-------|
| **Claude (claude.ai)** | Génération et itération du code complet, design éditorial, architecture de la logique de jeu, correction de bugs |
| **Claude Code** | Refactoring, debugging en CLI, modifications ciblées sur des fichiers |
| **Antigravity (Gemini)** | Implémentation de nouvelles fonctionnalités et amélioration du code, en complément de Claude |

---

## 5. Exemples de prompts

### Prompt 1 — Barre de progression dynamique

> *« Je voudrais que tu implémentes une dynamique de barre de progression lors d'une partie, avec un algorithme peut-être qui tourne en arrière-plan qui calcule le nombre de clics minimal requis pour arriver à la fin et qui montre donc au joueur en combien de clics il peut supposément finir la partie s'il joue bien. Qu'on soit d'accord, je ne veux pas qu'il y ait de réponse qui soit donnée. »*

**Ce que ça a produit :** Un algorithme basé sur la similarité de catégories Wikipedia entre l'article courant et la cible. Le résultat s'affiche sous forme de barre de progression colorée (froide → chaude) sans révéler le chemin optimal.

---

### Prompt 2 — Indice payant

> *« Le site comporte déjà une mécanique de comptage de clics lors d'une partie, je voudrais simplement que celle-ci soit incrémentée de 1 lorsqu'une demande d'indice est formulée. »*

**Ce que ça a produit :** Un bouton "Indice (+1 clic)" qui pénalise le compteur de 1 et révèle si la cible est atteignable directement ou en une étape depuis l'article courant, sans donner la réponse complète.

---

### Prompt 3 — Affichage sur l'écran de victoire

> *« Je voudrais qu'il soit affiché sur l'écran de victoire. »*

**Ce que ça a produit :** L'affichage du score final (clics + pénalités), du chemin optimal théorique, du record personnel et d'un graphe SVG visualisant le chemin parcouru sur l'écran de victoire.

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

**Hébergement auto-géré**
Le site n'est pas hébergé sur une plateforme clé en main (Vercel, Netlify) mais sur une infrastructure personnelle : VM Proxmox, serveur Nginx, Cloudflare en reverse proxy avec géo-restriction France. Cela a nécessité la configuration du SSL, des règles Cloudflare et du pare-feu.

---

## 7. Application hébergée

🔗 https://wikipath.alexis-briet.fr/

---

## 8. Repo GitHub

🔗 https://github.com/L3X1AS/Construire-une-App-Web-avec-des-outils-IA-main

---

*Projet réalisé dans le cadre du projet transversal — rendu le 12 avril 2026*