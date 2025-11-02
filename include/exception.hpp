#pragma once

#include <format>
#include <stacktrace>
#include <stdexcept>
#include <string>
#include <string_view>

class Exception : public std::runtime_error {
 public:
  template <class... Args>
  Exception(std::string_view fmt, Args&&... args)
      : std::runtime_error(std::vformat(fmt, std::make_format_args(args...))) {}

  auto stacktrace() const -> std::string;
};
