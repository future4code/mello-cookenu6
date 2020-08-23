# Cookenu

### **Israel Cavalcanti**

### **Renan Takeshi**

---

#### Tabela de usuários

```sql
CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("normal", "admin") DEFAULT "normal"
);
```

---

#### Tabela de receitas

```sql
CREATE TABLE Recipes (
    id  VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    creation_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);
```

---

#### Tabela de relações entre usuários

```sql
CREATE TABLE Follow_Relation (
    user_id VARCHAR(255) NOT NULL,
    follow_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, follow_id),
    FOREIGN KEY (user_id) REFERENCES  Users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES Users(id) ON DELETE CASCADE
);
```

---

#### Tabela de refresh tokens

```sql
CREATE TABLE Refresh_Token (
    token VARCHAR(255) NOT NULL,
    device VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```
