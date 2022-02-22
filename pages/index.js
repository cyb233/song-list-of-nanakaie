import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

import MusicList from "../public/music_list_7.json";

import SongDetail from "../components/SongDetail.component";

export default function Home() {
  //状态保存: 下拉选单和搜索框
  const [filterSongInitialSelect, setFilterSongInitialSelect] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [rapOnlyToggle, setRapOnlyToggle] = useState(false);

  //复制成功用户反馈Toast
  const notify = (song_name) =>
    toast.success(`"` + song_name + `"成功复制到剪贴板!`);

  //根据首字母和搜索框进行过滤
  const filteredSongList = MusicList.filter(
    (song) =>
      //首字母下拉选单
      (filterSongInitialSelect != ""
        ? filterSongInitialSelect == song.initial
        : true) &&
      //搜索框搜歌名
      (song.song_name
        ?.toString()
        .toLowerCase()
        .includes(searchBox ? searchBox.toLowerCase() : "") ||
        //搜索框搜语言
        song.language
          ?.toString()
          .toLowerCase()
          .includes(searchBox ? searchBox.toLowerCase() : ""))
  );

  const filteredSongListAfterToggle = filteredSongList.filter((song) =>
    rapOnlyToggle ? song.remarks?.toLowerCase().includes("rap") : true
  );

  //处理用户复制行为
  const handleClickToCopy = (songName) => {
    //复制到剪贴板并发送Toast
    copy("点歌 " + songName);
    // navigator.clipboard.writeText("点歌 " + songName); //如支持iOS则可替换
    notify(songName);
  };

  return (
    <div className={styles.outerContainer}>
      <Container>
        <Head>
          <title>七禾いえ的歌单</title>
          <meta
            name="keywords"
            content="七禾いえ,B站,bilibili,哔哩哔哩,电台唱见,歌单"
          />
          <meta name="description" content="七禾いえ的歌单" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className={styles.main}>
          {/** 头像和标题 */}
          <Row>
            <Col>
              <div className={styles.centerFlexDiv}>
                <img
                  className={"pt-3 " + styles.avatar}
                  src="./nanakaie.webp"
                  alt="七宝的头像"
                />
              </div>
              <h1 className={"display-6 text-center pt-3 " + styles.grandTitle}>
                七禾いえ的歌单
              </h1>
              <div className={styles.centerFlexDiv}>
                <Link href="https://live.bilibili.com/23777594" passHref>
                  <a target="_blank">
                    <Button
                      className={"mt-3 " + styles.customRapButton}
                    >
                      <img src="bilibili_logo.png" alt="bilibili logo" style={{ width: "20px", paddingBottom: "2px" }}/>{" "}前往七宝的直播间{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </Button>
                  </a>
                </Link>
              </div>
              <p className={"text-center py-3 text-muted"}>
                可以点击歌名复制哦
              </p>
            </Col>
          </Row>
          {/** 过滤器控件 */}
          <Row>
            <Col sm={12} md={6}>
              <Form.Select
                className={styles.filters}
                aria-label="按拼音首字母或语言过滤"
                onChange={(e) => setFilterSongInitialSelect(e.target.value)}
              >
                <option value="">按拼音首字母或语言过滤</option>
                <option value="A">国语-A</option>
                <option value="B">国语-B</option>
                <option value="C">国语-C</option>
                <option value="D">国语-D</option>
                <option value="E">国语-E</option>
                <option value="F">国语-F</option>
                <option value="G">国语-G</option>
                <option value="H">国语-H</option>
                <option value="I">国语-I</option>
                <option value="J">国语-J</option>
                <option value="K">国语-K</option>
                <option value="L">国语-L</option>
                <option value="M">国语-M</option>
                <option value="N">国语-N</option>
                <option value="O">国语-O</option>
                <option value="P">国语-P</option>
                <option value="Q">国语-Q</option>
                <option value="R">国语-R</option>
                <option value="S">国语-S</option>
                <option value="T">国语-T</option>
                <option value="U">国语-U</option>
                <option value="W">国语-W</option>
                <option value="X">国语-X</option>
                <option value="Y">国语-Y</option>
                <option value="Z">国语-Z</option>
                <option value="粤语">粤语</option>
                <option value="日语">日语</option>
                <option value="韩语">韩语</option>
                <option value="英语">英语</option>
              </Form.Select>
            </Col>
            <Col xs={6} md={3}>
              <div className="d-grid">
                <Button
                  className={styles.customRapButton}
                  onClick={(e) => setRapOnlyToggle(!rapOnlyToggle)}
                  style={rapOnlyToggle ? { backgroundColor: "#fff" } : {}}
                >
                  我要听七宝唱Rap!
                </Button>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <Form.Control
                className={styles.filters}
                type="search"
                aria-label="搜索"
                placeholder="搜索"
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </Col>
          </Row>
          {/** 歌单表格 */}
          <Row>
            <Col>
              <div className={styles.songListMarco}>
                <Container fluid>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>歌名</th>
                        {/** 等歌手补充 */}
                        {/** <th>歌手</th> */}
                        <th>语言</th>
                        <th>备注</th>
                      </tr>
                    </thead>
                    <tbody>
                      <SongDetail
                        filteredSongList={filteredSongListAfterToggle}
                        handleClickToCopy={handleClickToCopy}
                      />
                    </tbody>
                  </Table>
                </Container>
              </div>
            </Col>
          </Row>
        </section>

        <footer className={styles.footer}>
          Copyright © 2022 七宝和她的家人们
        </footer>
      </Container>
    </div>
  );
}
