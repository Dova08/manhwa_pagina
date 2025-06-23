<?php
class Database {
    private $host = "localhost";
    private $db_name = "leermanhwas";
    private $username = "root";
    private $password = "";
    private $conn;
    private $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    /**
     * Establece conexión PDO con la base de datos
     * @return PDO
     * @throws PDOException Si la conexión falla
     */
    public function connect(): PDO {
        if ($this->conn === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4";
                $this->conn = new PDO($dsn, $this->username, $this->password, $this->options);
            } catch (PDOException $e) {
                error_log("Error de conexión a DB: " . $e->getMessage());
                throw new PDOException("Error al conectar con la base de datos", 0, $e);
            }
        }
        return $this->conn;
    }

    /**
     * Obtiene la conexión PDO (alias de connect)
     * @return PDO
     */
    public function getConnection(): PDO {
        return $this->connect();
    }
}