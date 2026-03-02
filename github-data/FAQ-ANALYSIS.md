# FAQ & Docs Analysis Report

Based on analysis of **359 issues**, **324 PRs**, and **~100 discussions** from cjpais/handy.

---

## Proposed FAQ Questions (organized by category)

### General / Getting Started

**Q: What is "Christopher Pais" in my macOS Login Items?**
That's the developer's name (CJ Pais). Handy is signed under a personal Apple developer account, so macOS shows the developer's name instead of "Handy" in Login Items & Extensions. This is cosmetic and expected.
- Source: Discussion #283

**Q: What is "YNYNG LLC" that signed the Windows update?**
YNYNG LLC is the developer's business entity used for Windows code signing. It's required by Microsoft for valid code signing certificates. Updates signed by YNYNG LLC are legitimate Handy updates.
- Source: Discussion #754

**Q: Does Handy send any data to the cloud?**
No. All speech-to-text transcription happens locally on your device. The only network requests are for downloading models and checking for updates. If you enable post-processing with an AI provider, transcriptions are sent to that provider's API.
- Source: Multiple issues/discussions, very common question

**Q: Can Handy transcribe system audio (video calls, YouTube, etc.)?**
Not currently. Handy only transcribes microphone input. 
- Source: Issues #248, Discussion #185

**Q: Does Handy support real-time / live captions?**
Not yet. Handy currently records a segment, then transcribes it. Real-time streaming transcription is a work in progress.
- Source: Discussion #185

**Q: Where does Handy store its data (models, recordings, settings)?**
Check the About page to see the app data directory. Typical locations:
- **macOS**: `~/Library/Application Support/com.pais.handy/`
- **Windows**: `%APPDATA%/com.pais.handy/`
- **Linux**: `~/.local/share/com.pais.handy/`

Models are in the `models/` subdirectory, recordings in `recordings/`.
- Source: Issues #246, #234, various discussions

**Q: Can Handy start automatically when I log in?**
Yes. Go to Settings > Advanced and enable the Autostart toggle. You can also enable "Start Hidden" to launch Handy directly to the system tray without showing the main window.
- Source: PRs #177, #105

**Q: How do I change the UI language?**
Handy supports 18+ languages (English, Spanish, French, German, Japanese, Chinese, Korean, Arabic, Turkish, Czech, Portuguese, Ukrainian, Russian, Italian, Polish, Vietnamese, and more with RTL support). Change the language on the About page.
- Source: ~20 translation PRs

### The Debug Menu (Advanced Settings)

**Q: What is the debug menu and how do I open it?**
The debug menu contains advanced settings that aren't yet in the main UI. Open it with `Cmd+Shift+D` (macOS) or `Ctrl+Shift+D` (Windows/Linux). Features available here include:
- Paste method selection (clipboard, direct input, Shift+Insert, Ctrl+Shift+V, None, external script)
- Paste delay adjustment
- Mute system audio while recording
- Insert trailing space after transcription
- Custom word correction aggressiveness/threshold
- Number of recordings to keep on disk
- Clipboard handling options
- Sound theme selection
- Show/hide tray icon
- App data directory location

Many features users ask about already exist here.
- Source: Issues #240, #276, #578, #625, #712, #566, Discussions #223, #625, #578, #566

**Q: How do I find the log files?**
Go to About > Log Directory, or open the debug menu (`Cmd/Ctrl+Shift+D`) which shows the directory path. Logs are essential for troubleshooting crashes and verifying post-processing.
- Source: Issues #892, #887, #871, #867, #862, #840, and dozens more

**Q: The (x) button on the overlay discarded my recording!**
The (x) button on the overlay CANCELS the recording and discards all audio. It does not stop-and-transcribe. To stop recording and get your transcription, press the keyboard shortcut again.
- Source: Issue #859

### Models & Transcription Quality

**Q: Which model should I use for English?**
**Parakeet V3** is recommended for most English users. It's fast, accurate, and the most stable. If you need the absolute best accuracy and have capable hardware, try Whisper Medium or Large. For very low-powered hardware, try Moonshine.
- Source: Discussion #624, multiple issues

**Q: Why does Parakeet write out numbers as words instead of digits?**
This is a Parakeet model behavior. It outputs "one hundred twenty three" instead of "123". If you need digit output, use a Whisper model instead, or use post-processing to convert words to digits.
- Source: Multiple issues, Discussion #662

**Q: Whisper crashes when I select it. What can I do?**
This is a known issue on certain hardware configurations, particularly older CPUs and some Windows/Linux systems. Try:
1. Use Parakeet V3 instead (most stable, recommended)
2. Try a smaller Whisper model (Small instead of Large)
3. Check that your GPU drivers (Vulkan) are up to date
4. Run Handy from the command line with `--debug` to see detailed error logs
- Source: Issues #261, #266, #244, Discussion #723

**Q: Can I say "period", "comma", or "new line" to insert punctuation?**
Not directly. The speech-to-text models don't support voice-commanded punctuation natively. However, you can use the **post-processing** feature with an AI provider to convert spoken punctuation words into actual symbols. Some users have shared prompts for this in Discussion #715.
- Source: Discussion #662, #715

**Q: Why does Parakeet translate my non-English speech into English?**
Parakeet does not support language selection - it's primarily an English model. If it detects non-English speech, it may produce English output or gibberish. Use Whisper models if this is an issue for you. It doesn't seem to happen for everyone.
- Source: Issues #679, #812, #301, #665

**Q: Whisper keeps adding "thank you" or "bye bye" at the end of transcriptions**
This is a known Whisper model hallucination, especially with short recordings or silence at the end. It's not a Handy bug. Try keeping recordings concise, or use post-processing to strip these artifacts. Parakeet does not have this issue.
- Source: Issues #11, #402, #448, #649, #151, #66

**Q: My long recording (>5 minutes) failed or produced no output**
Current STT models don't handle very long audio well. Keep recordings under 3-5 minutes for best results. Audio chunking for longer recordings is planned but not yet implemented.
- Source: Issues #783, #865, #416

**Q: The model download failed and now I can't re-download it**
Partial downloads can block future download attempts. This is being worked out. For now a temporary fix:
1. Go to About > App Data Directory
2. Navigate to the `models/` folder
3. Delete any partially downloaded files
4. Restart Handy and re-download
- Source: Issues #858, #575, #515, #653, #217

**Q: How do I free up GPU memory (VRAM) when not using Handy?**
Handy has an inactivity timer that auto-unloads the model from memory. You can configure this in Settings, or set it to unload immediately. You can also manually unload the model via the system tray right-click menu ("Unload Model").
- Source: PRs #101, #731

**Q: Can I load a custom Whisper model?**
Yes, as an experimental feature. Place a Whisper-compatible `.bin` model file in the models directory and Handy can discover it. This is opt-in and found in experimental settings.
- Source: PR #622, Discussion #609

### Pasting & Output

**Q: What paste methods are available?**
Handy supports multiple paste methods depending on your platform:
- **Clipboard paste** (`Cmd/Ctrl+V`) - Default, works in most apps
- **Shift+Insert** - Good for terminal apps and SSH clients
- **Ctrl+Shift+V** - For apps that intercept Ctrl+V (Windows/Linux)
- **Direct input** - Types character-by-character without clipboard (avoid with non-US keyboard layouts)
- **None** - Copies to clipboard only, doesn't paste (useful if you switch windows during transcription)
- **External script** (Linux only) - Run a custom script for pasting

Switch paste methods in the debug menu (`Cmd/Ctrl+Shift+D`).
- Source: PRs #236, #364, #430, #638, multiple issues

**Q: Handy pastes garbled text with my non-English keyboard layout (AZERTY, QWERTZ, etc.)**
This happens when using the "direct input" paste method on Linux. The direct input method types character-by-character and doesn't account for non-US keyboard layouts. Fix: Open the debug menu (`Ctrl+Shift+D`) and switch the paste method to clipboard paste (`Ctrl+V` method).
- Source: Issue #270

**Q: Handy isn't pasting into my terminal / Windows Terminal**
If you're using Windows Terminal or similar elevated apps, try running Handy as administrator. Elevated apps can't receive simulated input from non-elevated processes. Also try the Shift+Insert or Ctrl+Shift+V paste methods which may work better in terminals.
- Source: Discussion #841, PRs #236, #430

### Keyboard Shortcuts

**Q: Can I use modifier-only shortcuts (e.g., just Ctrl+Shift)?**
Yes, since v0.7.0 with the new "Handy Keys" keyboard backend. You can set shortcuts to modifier-only combinations. On macOS, the Fn/Globe key is also supported as a modifier.
- Source: PR #580

### Post-Processing

**Q: How do I verify post-processing is actually working?**
Check the Handy logs (accessible from the About page). You should see API calls being made to your provider. The overlay also shows a "Processing..." state during post-processing. If using a very small model (e.g., 3B parameters), it may not follow instructions properly - try a larger model.
- Source: Discussion #860, PR #740

**Q: How do I set up post-processing with a local LLM (LM Studio)?**
1. Start your local LLM server (e.g., LM Studio, llama.cpp)
2. In Handy settings, set the provider to "Custom"
3. Set the Base URL to your local server's OpenAI-compatible endpoint (e.g., `http://localhost:1234/v1/` for LM Studio)
4. Select a model and write your prompt

There's also a community project [handy-local-rules](https://github.com/ahoendgen/handy-local-rules) that provides an OpenAI-compatible endpoint specifically designed for Handy post-processing.
- Source: Discussion #857, #715

**Q: What AI providers does Handy support for post-processing?**
- OpenAI
- Anthropic
- OpenRouter
- Cerebras
- Z.AI
- Apple Intelligence (macOS with Apple Silicon)
- Custom (any OpenAI-compatible API, including local LLMs)
- Source: PRs #849, #391, #517, multiple others

**Q: Where can I find good post-processing prompts?**
Check Discussion #715 "Share your postprocessing prompts" where users share their prompts for grammar fixing, punctuation insertion, filler word removal, and more.
- Source: Discussion #715

**Q: Will Handy ever support cloud-based speech-to-text?**
No. Handy is a local-first project. All transcription runs on your device. If you need cloud-based STT, Handy is not the right tool.
- Source: Discussions #682, #889

### Platform-Specific: macOS

**Q: Can I install Handy via Homebrew?**
Yes: `brew install --cask handy`
- Source: PR #705

### Platform-Specific: Windows

**Q: I get "vulkan-1.dll not found" error**
Update your GPU drivers (NVIDIA, AMD, or Intel). Vulkan is required for GPU acceleration. If your GPU is too old to support Vulkan, Handy may not work.
- Source: Issues #99, #346, #539, #290, #486

**Q: Handy can't paste into apps running as administrator**
Run Handy as administrator too. Windows prevents non-elevated processes from sending input to elevated windows.
- Source: Discussion #841, multiple issues

### Platform-Specific: Linux

**Q: AppImage fails with GLIBC error on Ubuntu 22.04**
The AppImage requires GLIBC 2.38+, but Ubuntu 22.04 has GLIBC 2.35. Use the `.deb` package instead, or upgrade to a newer distribution (Ubuntu 24.04+).
- Source: Issues #817, #419, #216, #750

**Q: The overlay steals focus and prevents pasting on Linux**
On some Linux desktop environments, the Handy overlay takes focus away from the target window, preventing paste. Fix: Set "Overlay Position" to "None" in Settings > Advanced.
- Source: Issues #379, #315, #327

**Q: Which paste/typing method should I use on Linux?**
Depends on your compositor:
- **X11**: Works out of the box (xdotool)
- **Wayland (sway, Hyprland)**: `wtype` is preferred
- **Wayland (KDE/KWin)**: `ydotool`, `dotool`, or `kwtype` (KWin doesn't support virtual-keyboard protocol that wtype needs)
- **Wayland (GNOME)**: See Discussion #718 for GNOME-specific setup

You can select the typing method in Handy's settings.
- Source: Discussions #718, #742, #777, #604, PRs #376, #557, #676, #760

**Q: The Wayland overlay isn't showing**
The Wayland overlay requires `gtk-layer-shell` as a runtime dependency:
- **Debian/Ubuntu**: `sudo apt install libgtk-layer-shell0`
- **Arch**: `sudo pacman -S gtk-layer-shell`
- **Fedora**: `sudo dnf install gtk4-layer-shell`

Note: On KDE Wayland, gtk-layer-shell initialization is skipped to prevent overlay issues.
- Source: PRs #680, #748, #752, #769

**Q: How do I control Handy from a window manager or script on Linux?**
Two approaches:
1. **Unix signals**: `pkill -USR2 -x handy` toggles transcription, `pkill -USR1 -x handy` toggles transcription with post-processing
2. **CLI flags**: `handy --toggle-transcription` or `handy --toggle-transcription-post-process`

Example Hyprland config:
```bash
bind = $mainMod SHIFT, period, exec, pkill -USR2 -x handy
```
- Source: PRs #354, #759, #792

**Q: I can't download models behind a corporate proxy/firewall**
You can manually download models and place them in the models directory:
1. Open the debug menu (`Ctrl+Shift+D`) to find your app data directory
2. Create a `models/` folder if it doesn't exist
3. Download the model `.bin` file manually (from HuggingFace or the download URL)
4. Place the `.bin` file directly in the `models/` directory
5. Restart Handy
- Source: Issue #246

---

## Recommended Doc Modifications

### 1. Add FAQ page (order: 9)
Create `src/content/docs/faq.mdx` with the content above, organized into sections.

### 2. Document the Debug Menu / Advanced Settings
The single biggest source of user confusion is hidden features in the debug menu. Consider either:
- **Option A**: Add a dedicated "Advanced Settings" docs page documenting all debug menu features
- **Option B**: Add debug menu features to their respective docs pages (e.g., "mute while recording" in Audio docs, "paste method" in Output docs)
- **Option C**: Promote the most-requested debug menu features to the main settings UI (many users/discussions request this)

Features that need documentation:
- Paste method selection (all 6 methods)
- Paste delay adjustment
- Mute while recording
- Trailing space insertion
- Word correction threshold
- Number of recordings to keep
- Clipboard handling
- Sound themes
- Show/hide tray icon
- App data directory location

### 3. Expand the Troubleshooting page
Add these common issues:
- Whisper crashes (suggest Parakeet as alternative)
- Non-English keyboard layout garbled text
- Clipboard manager interference
- GNOME Remote Desktop popup
- Corporate proxy model download workaround
- Windows DPI scaling issues
- Rapid shortcut toggling causing freeze (fixed in v0.7.x)
- Linux: Escape-to-cancel not available

### 4. Expand the Output docs
- Document ALL paste methods (clipboard, Shift+Insert, Ctrl+Shift+V, direct, none, external script)
- Explain when to use each paste method
- Document the trailing space feature
- Document auto-submit variants (Enter, Ctrl+Enter, Cmd+Enter)
- Add clipboard manager compatibility notes
- Document the "Copy Last Transcription" tray action

### 5. Expand Post-Processing docs
- Add local LLM setup guide (LM Studio, handy-local-rules)
- List all supported providers (OpenAI, Anthropic, OpenRouter, Cerebras, Z.AI, Apple Intelligence, Custom)
- Document the dedicated post-processing hotkey
- Link to community prompt-sharing discussion (#715)
- Add troubleshooting for post-processing (how to verify it works, model size recommendations)
- Document the overlay "Processing..." state

### 6. Expand the CLI / Integration docs
- Document SIGUSR1/SIGUSR2 signal control
- Document `--toggle-transcription` and `--toggle-transcription-post-process` flags
- Add more window manager examples (GNOME shortcuts, KDE, etc.)
- Document the signal approach as the recommended way for Wayland integration

### 7. Expand the Transcription docs
- Document filler word removal (on by default)
- Document hallucination artifact removal
- Document stutter collapse

### 8. Expand the Audio docs
- Document the "Mute while recording" feature
- Document the clamshell mode fallback microphone setting

### 9. Add "Known Issues" section to Troubleshooting
Clearly list known issues that don't have fixes yet:
- Whisper instability on certain hardware
- Windows DPI scaling
- Linux audio playback in history

### 10. Update Getting Started
- Mention Homebrew installation for macOS
- Mention autostart and start-hidden options

---

## Undocumented Features Found in PRs

These features exist in the app but are NOT covered in current docs:

| Feature | PR(s) | Should be documented in |
|---------|-------|------------------------|
| Filler word & hallucination removal | #589 | Transcription page |
| N-gram custom word matching | #711 | Output page (Custom Words) |
| Dedicated post-processing hotkey | #355 | Post-Processing page |
| SIGUSR1/SIGUSR2 signal control | #354, #759, #792 | CLI page |
| `--toggle-transcription` CLI flags | #792 | CLI page |
| Auto-submit variants (Ctrl+Enter, etc.) | #765 | Output page |
| Unload Model from tray | #731 | Models or FAQ |
| Paste method: None | #364 | Output page |
| Paste method: External script (Linux) | #638 | Output page |
| Paste method: Shift+Insert | #236 | Output page |
| Paste method: Ctrl+Shift+V | #430 | Output page |
| Copy Last Transcription from tray | #598 | Output or FAQ |
| Right/Left modifier distinction | #782 | Transcription page (Shortcuts) |
| Fn/Globe key support (macOS) | #580 | Transcription page (Shortcuts) |
| Mute while recording | #257, #341 | Audio page |
| Trailing space option | #405 | Output page |
| Paste delay setting | #694 | Output or Troubleshooting |
| Z.AI provider | #849 | Post-Processing page |
| Processing overlay state | #740 | Transcription page (Overlay) |
| Overlay translation display | #465 | Transcription page (Overlay) |
| Show/hide tray icon | #667 | FAQ or new Settings page |
| Start hidden / launch to tray | #105 | Getting Started or FAQ |
| Autostart toggle | #177 | Getting Started or FAQ |
| Disable update checking | #362 | FAQ |
| Custom Whisper model discovery | #622 | Models page |
| File-based debug logging | #347 | Troubleshooting page |
| Wayland overlay (gtk-layer-shell) | #680 | Linux Troubleshooting |
| Linux ARM64 builds | #629 | Getting Started (Download) |
| Windows ARM64 builds | #340 | Getting Started (Download) |
| Homebrew installation | #705 | Getting Started (Download) |
| NixOS support | #561+ | Getting Started or FAQ |
| 18+ UI languages | multiple | FAQ or Settings page |

---

## Statistics

| Source | Count | FAQ-relevant items |
|--------|-------|--------------------|
| Issues | 359 | ~45 unique FAQ-worthy topics |
| PRs | 324 | ~35 undocumented features |
| Discussions | ~100 | ~30 Q&A and feature discussions |

### Top themes by frequency:
1. **Debug menu hidden features** (20+ instances across issues/discussions)
2. **Paste not working / paste method issues** (17+ PRs, 15+ issues)
3. **Whisper crash/instability** (10+ issues, known hardware-dependent)
4. **Linux Wayland global shortcuts don't work** (10+ issues, need SIGUSR2)
5. **Non-English language support confusion** (12+ issues, Parakeet vs Whisper)
6. **Non-QWERTY keyboard layout garbled text** (10+ issues, switch paste method)
7. **Post-processing setup & discovery** (10+ instances)
8. **Keyboard shortcut issues** (15 PRs, 8+ issues)
9. **vulkan-1.dll on Windows** (5+ issues)
10. **Failed model download recovery** (5+ issues)
11. **Whisper hallucinations** ("thank you", "bye bye") (6+ issues)
12. **Windows duplicate app entries** (4+ issues)
13. **Linux overlay steals focus** (4+ issues)
14. **macOS overlay on fullscreen** (4+ instances)
15. **Corporate proxy/download issues** (3+ instances)
16. **"Christopher Pais" / YNYNG LLC identity confusion** (3+ instances)
