package api

import (
	"github.com/hungcq/tcp-api/models"
	"strings"
)

func EncodeRequest(command string, args ...string) string {
	return command + "|" + strings.Join(args, "|") + "\n"
}

func ParseUserInfo(res string) models.User {
	arr := strings.Split(res, "|")
	if len(arr) < 3 {
		return models.User{}
	}
	userInfo := models.User{Username: arr[0], Nickname: arr[1], Avatar: arr[2]}
	return userInfo
}

func DecodeReq(req string) models.TcpRequest {
	arr := strings.Split(req, "|")
	return models.TcpRequest{Command: arr[0], Args: arr[1:]}
}

func EncodeResponse(args ...string) string {
	return strings.Join(args, "|") + "\n"
}

func EncodeUserInfo(user models.User) string {
	data := []string{user.Username, user.Nickname, user.Avatar}
	return strings.Join(data, "|")
}
