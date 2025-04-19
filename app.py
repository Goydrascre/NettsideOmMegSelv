import sqlite3
import bcrypt

# Funksjon for å koble til databasen
def connect_db():
    conn = sqlite3.connect('db/brukere.db')  # Koble til databasen i /db-mappen
    return conn

# Funksjon for å opprette tabellen (brukes bare første gang)
def create_table():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT NOT NULL UNIQUE,
                        password TEXT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

# Funksjon for å registrere en ny bruker
def register_user(username, password):
    conn = connect_db()
    cursor = conn.cursor()

    # Krypter passordet
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Legg til brukeren i databasen
    cursor.execute('''INSERT INTO users (username, password)
                      VALUES (?, ?)''', (username, hashed_password))

    conn.commit()
    conn.close()
    print(f"Bruker '{username}' er registrert med kryptert passord!")

# Funksjon for å sjekke innlogging
def login_user(username, password):
    conn = connect_db()
    cursor = conn.cursor()

    # Hent brukerens data basert på brukernavn
    cursor.execute('''SELECT password FROM users WHERE username = ?''', (username,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
        print("Innlogging vellykket!")
    else:
        print("Feil brukernavn eller passord!")

    conn.close()

# Kjør funksjoner som testing
if __name__ == "__main__":
    create_table()  # Opprett tabellen (kan kjøres første gang)
    # Register og login eksempel
    register_user('testbruker', 'sikkertpassord123')
    login_user('testbruker', 'sikkertpassord123')
