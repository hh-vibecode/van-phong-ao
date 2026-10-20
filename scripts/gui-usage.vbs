' Chạy gui-usage.js ẩn cửa sổ (lịch Windows "vp-gui-usage", mỗi phút) — Mr.Mon 20/10/2026
Set sh = CreateObject("WScript.Shell")
sh.Environment("PROCESS")("ELECTRON_RUN_AS_NODE") = "1"
sh.Run """D:\Microsoft VS Code\Code.exe"" ""C:\Users\HP\Desktop\0.van-phong-ao\scripts\gui-usage.js""", 0, True
