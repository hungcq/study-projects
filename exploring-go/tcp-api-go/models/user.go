package models

type User struct {
	Username string
	Password string
	Nickname string
	Avatar   string
	Salt     string
}
