set quiet := true

[private]
help:
    just --list --unsorted

deploy:
    npm publish

fmt:
    just --fmt
    find . -name '*.just' -print0 | xargs -0 -I{} just --fmt -f {}
