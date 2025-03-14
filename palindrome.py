def is_palindrome(s):
    return s == s[::-1]

# Example usage
word = "radar"
if is_palindrome(word):
    print(f"'{word}' is a palindrome")
else:
    print(f"'{word}' is not a palindrome")
