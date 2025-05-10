# API RESTful avec Rate Limiting et CORS (TP2.5)

Ce projet met en œuvre la gestion des Cross-Origin Resource Sharing (CORS) et un mécanisme de Rate Limiting pour une API RESTful Node.js/Express. L'API interagit avec une base de données SQLite pour des opérations CRUD sur une ressource `/personnes`.

**Matière:** SoA et Microservices
**Enseignant:** Dr. Salah Gontara
**Classe:** 4Info
**A.U.:** 2024/2025

## Objectifs du TP
- Configurer **CORS** pour permettre les requêtes depuis différentes origines.
- Implémenter le **Rate Limiting** pour sécuriser l'API contre un nombre excessif de requêtes.

## Prérequis
- Node.js et npm installés.
- (Optionnel) Un client HTTP comme Postman pour les tests.

## Installation et Configuration

1.  **Préparation du Projet :**
    Assurez-vous d'avoir un projet Node.js existant ou initialisez-en un nouveau (`npm init -y`).

2.  **Installation des Dépendances :**
    Installez les paquets nécessaires via npm :
    - `express`
    - `sqlite3`
    - `cors`
    - `express-rate-limit`

3.  **Fichiers du Projet :**
    - `database.js`: Configure la connexion à la base de données SQLite et initialise la table `personnes`.
    - `index.js`: Fichier principal de l'application Express. C'est ici que la logique de l'API, la configuration CORS, et le Rate Limiting sont implémentés.
    - `mydb.sqlite`: Fichier de base de données (créé automatiquement).

## Démarrage de l'Application
Le serveur écoutera sur http://localhost:3000 (ou le port configuré).
Endpoints de l'API (Exemple)
L'API expose typiquement des endpoints pour la ressource `/personnes`, tels que :
- `GET /personnes`: Pour lister les personnes.
- `POST /personnes`: Pour ajouter une personne.
- *(D'autres endpoints CRUD peuvent être présents)*

## Tester l'Implémentation

1.  **Tester CORS**
    *   **Méthode :** Créez une page HTML simple servie depuis une origine différente (ou un fichier local ouvert dans le navigateur). Cette page utilisera `fetch` (JavaScript) pour appeler un endpoint de votre API (par exemple, `GET /personnes`).
    *   **Attendu :** Les données de l'API doivent être récupérées et affichées sans erreurs CORS dans la console du navigateur. Cela confirme que le serveur autorise les requêtes cross-origin.

2.  **Tester le Rate Limiting**
    *   **Méthode :** Utilisez un outil comme Postman pour envoyer un grand nombre de requêtes (par exemple, plus de 100) à un endpoint de votre API en un court laps de temps (moins de 15 minutes, selon la configuration).
    *   **Attendu :**
        *   Les premières requêtes (dans la limite autorisée) devraient réussir.
        *   Une fois la limite dépassée, l'API devrait répondre avec un statut `429 Too Many Requests` et un message indiquant que la limite a été atteinte.
        *   Après la période de blocage (par exemple, 15 minutes), les requêtes devraient à nouveau être acceptées.

## Configuration des Middlewares

Dans `index.js`, les middlewares suivants sont configurés et appliqués à l'application Express :

-   **`cors` :**
    *   Ce middleware est utilisé pour activer CORS.
    *   Il peut être configuré pour autoriser toutes les origines ou des origines spécifiques.
-   **`express-rate-limit` :**
    *   Ce middleware est utilisé pour limiter le nombre de requêtes qu'une même IP peut faire sur une période donnée.
    *   Les paramètres clés incluent la fenêtre de temps (`windowMs`) et le nombre maximum de requêtes (`max`).
