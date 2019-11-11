"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        yield conn.query("Select * from posts", function (err, posts) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(posts));
                res.json(posts);
            }
        });
    });
}
exports.getPosts = getPosts;
function createPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield database_1.connect();
        yield conn.query("INSERT INTO posts set ?", newPost, function (err, posts1) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(posts1.insertId));
                res.json({
                    "message": "Post created",
                    "post_id": posts1.insertId
                });
            }
        });
    });
}
exports.createPosts = createPosts;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        yield conn.query("Select * from posts where id = ? ", req.params.postId, function (err, posts) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(posts));
                res.json(posts);
            }
        });
    });
}
exports.getPost = getPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        yield conn.query("DELETE FROM posts WHERE id = ? ", req.params.postId, function (err, posts) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(posts));
                res.json(posts);
            }
        });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const updatePost = req.body;
        yield conn.query("UPDATE posts SET ? WHERE id = ?", [updatePost, req.params.postId], function (err, posts) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(posts));
                res.json(posts);
            }
        });
    });
}
exports.updatePost = updatePost;
