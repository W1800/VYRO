const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("VYRO Backend is running!");
});

app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.includes("tiktok.com")) {
      return res.status(400).json({
        error: "ضع رابط تيك توك صحيح"
      });
    }

    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ url })
    });

    const data = await response.json();

    if (!data.data || !data.data.play) {
      return res.status(400).json({
        error: "تعذر الحصول على الفيديو"
      });
    }

    res.json({
      success: true,
      video: data.data.play
    });

  } catch (error) {
    res.status(500).json({
      error: "حدث خطأ في الخادم"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
