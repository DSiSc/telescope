Telescope
=======

Telescope is a simple, powerful, easy-to-use, highly maintainable, open source browser for viewing activity on the underlying blockchain network. Users have the ability to configure & build Telescope natively on macOS and Ubuntu.

## Table of Contents

- [Release Notes](#Release-Notes)
- [Directory Structure](#Directory-Structure)
- [Requirements](#Requirements)
- [Clone Repository](#Clone-Repository)
- [Database Setup](#Database-Setup)
- [Composer Configure Telescope](#Composer-Configure-Telescope)
- [Build Telescope](#Build-Telescope)
- [Run Telescope](#Run-Telescope)
- [Telescope Swagger](#Telescope-Swagger)
- [Logs](#Logs)
- [Troubleshooting](#Troubleshooting)
- [License](#License)


<a name="Release-Notes"/>

## Release Notes

- [Release Notes](release_notes/v0.0.1.md)


<a name="Directory-Structure"/>

## Directory Structure
```
├── app                 Application backend root
    ├── explorer        Explorer configuration, REST API
    ├── persistence     Persistence layer
    ├── platform        Platforms
        ├── justitia    Explorer API (DSiSc Justitia)
        ├── burrow      Explorer API (Burrow based on tendermint)
        ├── tendermint  Explorer API (Tendermint)
├── client              Web UI
    ├── public          Assets
    ├── src             Front end source code
        ├── components  React framework
        ├── services    Request library for API calls
        ├── state       Redux framework
        ├── static      Custom and Assets
```
<a name="Requirements"/>

## Requirements

Following are the software dependencies required to install and run telescope explorer
* nodejs 8.11.x (Note that v9.x is not yet supported)
* PostgreSQL 9.5 or greater

Telescope works with Justitia, Burrow or Tendermint.

<a name="Clone-Repository"/>

## Clone Repository

Clone this repository to get the latest using the following command.

- `git clone https://github.com/DSiSc/telescope.git`.
- `cd telescope`.

<a name="Database-Setup"/>

## Database Setup

**Important repeat after every git pull

Connect to PostgreSQL database.

#### Ubuntu

- `sudo -u postgres psql`

#### macOS

 - `psql postgres`

Run create database script.

- `\i app/persistence/postgreSQL/db/initdb.sql`

Run db status commands.

- `\l` view created telescope database
- `\d` view created tables

Run clear database script.

- `\i app/persistence/postgreSQL/db/cleardb.sql`


## Composer Configure Telescope

On another terminal.

- `cd telescope/app/platform/justitia`, or `cd telescope/app/platform/burrow`, or `cd telescope/app/platform/tendermint` as with your backend blockchain.
- Modify config.json to update network-config.

- `cd telescope/app/persistence/postgreSQL/db`
- Modify pgconfig.json to update postgresql properties
    - pg host, port, database, username, password details.
```json
 "pg": {
        "host": "127.0.0.1",
        "port": "5432",
        "database": "telescope",
        "username": "telescope",
        "passwd": "password"
    }
```

<a name="Build-Telescope"/>

## Build Telescope
**Important repeat after every git pull

On another terminal.

- `cd telescope`
- `npm install`
- `cd client/`
- `npm install`
- `npm run build`

<a name="Run-Telescope"/>

## Run Telescope

From new terminal.

- `cd telescope/`
- `./start.sh`  (it will have the backend up).
- Launch the URL http://localhost:8080 on a browser.
- `./stop.sh`  (it will stop the node server).

- If the Telescope was used previously in your browser be sure to clear the cache before relaunching.

<a name="Telescope-Swagger"/>

## Run Telescope using Docker

There is also an automated deployment of the **Telescope** available via **docker** having next assumptions:

* **BASH** installed
* **Docker** is installed on deployment machine.
### Non interactive deployment assumptions
* By default, deployment script uses **192.168.10.0/24** virtual network, and needs to be available with no overlapping IPs (this means you can't have physical computers on that network nor other docker containers running). In case of overlappings, edit the script and change target network and container targets IPs.
* By default both services (fronted and database) will run on same machine, but script modifications is allowed to run on separate machines just changing target DB IP on frontend container.
* Crypto material is correctly loaded under `examples/$network/crypto`
* Fabric network configuration is correctly set under `examples/$network/config.json`

### Steps to deploy using Docker Compose

From new terminal.

- `cd telescope/`
- Create a new folder as you wish (eg. `~/.telescope/pg_data`) to store postgresql data, then change its owner to id 26(`sudo chown 26 ~/.telescope/pg_data`). Modify volumes of `postgresql` in `docker-compose.yml` accordingly.
- `bash docker-ops.sh deploy` to deploy telescope through docker-compose.
- `bash docker-ops.sh up/down` to start or stop telescope.
- `bash docker-ops.sh undeploy` to undeploy telescope through docker-compose, (NOTE: postgresql data will be removed).
- `bash docker-ops.sh initdb/cleardb` to initialize database structure or drop data in all tables.

## Telescope Swagger

- Once the Telescope has been launched go to http://localhost:8080/api-docs to view the Rust API description

<a name="Logs"/>

## Logs
- Please visit the [./logs/console]() folder to view the logs relating to console and [./logs/app]() to view the application logs and visit the [./logs/db]() to view the database logs.
- Logs rotate for every 7 days.

<a name="Troubleshooting"/>

## Troubleshooting

- Please visit the [TROUBLESHOOT.md](TROUBLESHOOT.md) to view the Troubleshooting TechNotes for Telescope.

<a name="License"/>

## License

Telescope Project source code is released under the Apache 2.0 license. The README.md, CONTRIBUTING.md files, and files in the "images", "__snapshots__" folders are licensed under the Creative Commons Attribution 4.0 International License. You may obtain a copy of the license, titled CC-BY-4.0, at http://creativecommons.org/licenses/by/4.0/.

