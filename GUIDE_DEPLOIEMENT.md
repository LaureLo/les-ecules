# Guide de Déploiement Complet : Vercel + Supabase + Resend + Hostinger

Ce document regroupe toutes les étapes par ordre chronologique pour déployer une application web moderne de A à Z, en configurant l'hébergement, la base de données, l'authentification et l'envoi d'emails transactionnels avec un nom de domaine personnalisé.

---

## 📅 Sommaire

1. [Préparation du projet (Local & GitHub)](#1-préparation-du-projet)
2. [Hébergement Frontend (Vercel)](#2-hébergement-frontend-vercel)
3. [Base de données et Auth (Supabase)](#3-base-de-données-et-auth-supabase)
4. [Emails Transactionnels (Resend)](#4-emails-transactionnels-resend)
5. [Configuration du Nom de Domaine (Hostinger)](#5-configuration-du-nom-de-domaine-hostinger)
6. [Connexion Supabase ↔️ Resend (SMTP Custom)](#6-connexion-supabase-%E2%86%94%EF%B8%8F-resend-smtp-custom)

---

## 1. Préparation du projet

### 1.1 GitHub

1. Créez un dépôt sur GitHub (ex: `mon-nouveau-projet`).
2. Dans votre terminal local, initialisez Git et poussez votre code :

   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/votre-compte/mon-nouveau-projet.git
   git push -u origin main
   ```

### 1.2 Variables d'environnement locales

Créez un fichier `.env.local` à la racine de votre projet React/Vite :

```env
VITE_SUPABASE_URL=votre_future_url_supabase
VITE_SUPABASE_ANON_KEY=votre_future_cle_anonyme
```

*(Optionnel si vous codez votre backend dans le même projet :)*

```env
RESEND_API_KEY=votre_future_cle_resend
```

---

## 2. Hébergement Frontend (Vercel)

L'objectif ici est d'avoir une URL publique de votre site pour configurer correctement la "Site URL" dans Supabase.

1. Connectez-vous sur [Vercel](https://vercel.com).
2. Cliquez sur **Add New... > Project**.
3. Importez votre dépôt GitHub `mon-nouveau-projet`.
4. Configurez les options :
   - Framework Preset : Vite (devrait être détecté automatiquement).
   - Environment Variables : Vous les rajouterez plus tard quand Supabase sera prêt.
5. Cliquez sur **Deploy**.
6. Une fois fini, Vercel vous donne un domaine générique : *mon-nouveau-projet.vercel.app*. **Copiez cette URL**.

---

## 3. Base de données et Auth (Supabase)

1. Connectez-vous sur [Supabase](https://supabase.com).
2. Cliquez sur **New Project**.
3. Définissez le nom, le mot de passe de base de données (gardez-le secrètement) et la région (choisissez une région proche de vos utilisateurs, ex: *Frankfurt* ou *Paris*).
4. Allez dans **Project Settings > API**.
   - Récupérez l'**URL** du projet et la clé **anon / public**.
   - Collez-les dans votre fichier `.env.local` et sur **Vercel** (onglet *Settings > Environment Variables*).
5. **Configuration de l'Authentification** :
   - Allez dans la section **Authentication** (icone cadenas) > **URL Configuration**.
   - **Site URL** : Remplacez `http://localhost:5173` par l'URL Vercel copiée à l'étape 2 (puis plus tard, par votre vrai domaine Hostinger).
   - **Redirect URLs** : Ajoutez `http://localhost:5173/**` pour le développement local, et `https://mon-nouveau-projet.vercel.app/**` pour la production.

---

## 4. Configuration du Nom de Domaine (Hostinger ➡️ Vercel)

Pour lier votre nom de domaine acheté sur Hostinger à votre site hébergé sur Vercel :

1. Sur Vercel, allez dans **Settings > Domains** de votre projet.
2. Saisissez votre domaine (ex: `mondomaine.com`) et cliquez sur *Add*.
3. Vercel va vous donner des enregistrements DNS à configurer (généralement un type `A` ou `CNAME`).
4. Ouvrez un nouvel onglet, allez sur [Hostinger](https://hpanel.hostinger.com/) > **Domaines** > **Gérer les zones DNS**.
5. Ajoutez les entrées fournies par Vercel :
   - Pour le domaine racine (`mondomaine.com`) : Type **A**, Nom `@`, Valeur `76.76.21.21`
   - Pour le sous-domaine www (`www.mondomaine.com`) : Type **CNAME**, Nom `www`, Valeur `cname.vercel-dns.com.`
6. Dans Vercel, patientez jusqu'à ce que le statut passe au vert (cela peut prendre quelques minutes).
7. **Important** : Retournez dans Supabase > Auth > URL Configuration, et mettez votre nouveau domaine `https://mondomaine.com` en "Site URL".

---

## 5. Emails Transactionnels (Resend)

Par défaut, Supabase limite l'envoi d'emails d'inscription/réinitialisation de mdp à quelques e-mails par heure de développement. Pour la production, nous passons par Resend.

1. Créez un compte sur [Resend](https://resend.com).
2. Allez dans **Domains** et cliquez sur **Add Domain**.
3. Saisissez votre domaine (ex: `mondomaine.com`) et la région.
4. Resend va générer plusieurs enregistrements DNS (très souvent des types `TXT` et `MX`).
5. **Validation DNS via Hostinger** :
   - Retournez sur Hostinger > **Gérer les zones DNS**.
   - Copiez et collez chaque enregistrement donné par Resend (comme `bounces`, `_dmarc`, clé DKIM, etc).
   - Prenez garde à ne pas insérer le domaine principal dans Hostinger si l'encart "Nom" exige uniquement le préfixe.
6. Cliquez sur **Verify DNS** dans Resend. Une fois vérifié, le domaine passe au vert.
7. Allez dans l'onglet **API Keys** de Resend et créez une clé. Copiez-la.

---

## 6. Connexion Supabase ↔️ Resend (SMTP Custom)

Dernière étape cruciale : dire à Supabase d'utiliser Resend pour envoyer ses emails d'authentification (Magic Links, etc) depuis votre propre nom de domaine.

1. Retournez sur le tableau de bord de **Supabase**.
2. Allez dans **Project Settings > Authentication**.
3. Faites défiler jusqu'à la section **SMTP Provider** (ou "Custom SMTP").
4. Activez l'option "Enable Custom SMTP" et remplissez ainsi :
   - **Host** : `smtp.resend.com`
   - **Port** : `465` (ou `587`)
   - **Username** : `resend` (C'est littéralement le mot "resend")
   - **Password** : Collez la clé d'API Resend que vous venez de générer.
   - **Sender Name** : Le nom de votre projet (ex: *Mon Nouveau Projet*)
   - **Sender Email** : `hello@mondomaine.com` (ou n'importe quel mail utilisant votre domaine vérifié).
5. Sauvegardez !

Désormais, lorsque l'application fait appel à `supabase.auth.signInWithOtp()`, l'email est formaté dans Supabase, routé via l'API SMTP de Resend, expédié sous votre nom de domaine certifié par DKIM chez Hostinger, et reçu sans tomber en SPAM par les utilisateurs pointant sur votre serveur Vercel.

**La boucle est bouclée ! 🎉**
