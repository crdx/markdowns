set quiet := true

[private]
help:
    just --list --unsorted

deploy:
    npm publish

fmt:
    just --fmt
