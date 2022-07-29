package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type ImageData struct {
	Image_url string `json:"image_url"`
}

type Bilibili_Image_Resp struct {
	Code    uint64    `json:"code"`
	Message string    `json:"message"`
	Data    ImageData `json:"data"`
}

func main() {
	flag.Parse()
	args := flag.Args()
	// fmt.Println("args: ", args, len(args))
	SESSDATA := args[0]
	if strings.HasPrefix(SESSDATA, "token=") {
		SESSDATA = strings.Replace(SESSDATA, "token=", "", 1)
	} else {
		fmt.Println("请在命令尾部输入一个空格，再输入token=你的SESSDATA, 例如\n ...-macos token=xx")
		return
	}
	// fmt.Println("SESSDATA: ", SESSDATA)
	for i := 1; i < len(args); i++ {
		imagePath := args[i]
		payload := &bytes.Buffer{}
		writer := multipart.NewWriter(payload)
		writer.WriteField("category", "daily")
		writer.WriteField("biz", "draw")
		file, err := os.Open(imagePath)
		if err != nil {
			fmt.Println("打开文件失败: ", err)
			return
		}
		defer file.Close()
		part, err := writer.CreateFormFile("file_up", filepath.Base(imagePath))
		if err != nil {
			fmt.Println("创建文件失败: ", err)
			return
		}
		_, err = io.Copy(part, file)
		if err != nil {
			fmt.Println(err)
			return
		}
		writer.Close()
		url := "https://api.vc.bilibili.com/api/v1/drawImage/upload"
		// url := "http://localhost:5001/common/test"
		client := &http.Client{}
		req, err := http.NewRequest("POST", url, payload)
		if err != nil {
			fmt.Println(err, "1231")
			return
		}
		req.Header.Add("Cookie", "SESSDATA="+SESSDATA)
		req.Header.Add("Content-Type", writer.FormDataContentType())
		res, err := client.Do(req)
		if err != nil {
			fmt.Printf("%s", err)
		} else {
			defer res.Body.Close()
			if err != nil {
				fmt.Printf("%s", err)
			}

		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			fmt.Println(err)
			return
		}
		p := Bilibili_Image_Resp{}
		jsonErr := json.Unmarshal(body, &p)
		if jsonErr != nil {
		    fmt.Println("响应错误，可能是token已过期")
			log.Fatal(jsonErr)
		}
		message := p.Message
		// fmt.Println(message)
		if p.Data.Image_url != "" {
			if i == 1 {
				fmt.Println("Upload Success:")
			}
			url := strings.Replace(p.Data.Image_url, "http", "https", 1)
			fmt.Println(url)

		} else if message == "请先登录" {
			fmt.Println("token过期了，请及时更新命令行中的token")
		} else {
			fmt.Println("发生未知错误，请查看最新仓库，错误信息：" + message)
		}
	}
}
