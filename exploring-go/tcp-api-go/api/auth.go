package api

type AuthTcpApi interface {
	Login(username string, password string) (session string, err error)
	Logout(session string)
}
