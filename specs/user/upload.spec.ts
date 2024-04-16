import * as supertest from "supertest";
import { upload } from "../../data/helpers";
const request = supertest("https://practice-react.sdetunicorns.com/api/test");

describe("UPLOAD", () => {
  it("upload single document", async () => {
    await request
      .post("/upload/single")
      .attach("single", "image/pH.jpg")
      .then((el) => {
        expect(el.body.filename).toBe("pH.jpg");
      });
  });
  it("upload single documents", async () => {
    const files: string[] = ["image/pH.jpg", "image/minion.jpg"];
    const res = await upload(files);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
});
