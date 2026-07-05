function parseColor(text) {
  const regex = /\{([0-9A-Fa-f]{6})\}([^{}]*)/g

  return text.replace(regex, (_, color, content) => {
    return `<span style="color:#${color}">${content}</span>`
  })
}

export function parseChat(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 10)

  return lines.map((line) => {
    let finalText = line
    let className = "normal"

    // /me
    if (line.startsWith("/me")) {
      className = "special"
      finalText = "*" + line.replace("/me", "").trim()
    }

    // /do
    else if (line.startsWith("/do")) {
      className = "special"
      finalText = line.replace("/do", "").trim()
    }

    // /lme
    else if (line.startsWith("/lme")) {
      className = "low"
      finalText = "*" + line.replace("/lme", "").trim()
    }

    // /ldo
    else if (line.startsWith("/ldo")) {
      className = "low"
      finalText = line.replace("/ldo", "").trim()
    }

    // /m
    else if (line.startsWith("/m")) {
      className = "megaphone"

      const textOnly = line.replace("/m", "").trim()
      const words = textOnly.split(" ")

      if (words.length >= 2) {
        words.splice(2, 0, "[MEGAPHONE]:")
      } else {
        words.push("[MEGAPHONE]:")
      }

      finalText = words.join(" ")
    }

    // /s
    else if (line.startsWith("/s")) {
      className = "shout"

      const textOnly = line.replace("/s", "").trim()
      const words = textOnly.split(" ")

      if (words.length >= 2) {
        words.splice(2, 0, "shouts:")
      } else {
        words.push("shouts:")
      }

      finalText = words.join(" ")
    }

    // kalau udah pakai *
    else if (line.startsWith("*")) {
      className = "special"
      finalText = line
    }

    return {
      text: parseColor(finalText),
      className
    }
  })
}