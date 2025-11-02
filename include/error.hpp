#pragma once

#include <format>
#include <memory>
#include <string_view>

#include "exception.hpp"

template <class... Args>
auto ensure(bool predicate, std::string_view message, Args &&...args) -> void {
  if (!predicate) {
    throw Exception(message, std::forward<Args>(args)...);
  }
}

template <class T, class D, class... Args>
auto ensure(std::unique_ptr<T, D> &obj, std::string_view message,
            Args &&...args) -> void {
  ensure(!!obj, message, std::forward<Args>(args)...);
}
