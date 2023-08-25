package api

import (
	"github.com/hungcq/tcp-api/models"
)

type UserTcpApi interface {
	GetUserInfo(session string) (userInfo models.User, err error)
	UpdateUserInfo(session string, userInfo models.User) (oldAvatarUrl string, err error)
	GetUserInfoByUsername(username string) (userInfo models.User, err error)
}
