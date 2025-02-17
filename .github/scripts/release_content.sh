CHANGELOG_FILE="$1"
VERSION="$2"

sed -n "/^## ${VERSION}$/,/^## /p" "$CHANGELOG_FILE" | sed '/^## /d' > /tmp/changelog.md
printf "%s" "$(cat /tmp/changelog.md)" > /tmp/changelog.md

cat /tmp/changelog.md
