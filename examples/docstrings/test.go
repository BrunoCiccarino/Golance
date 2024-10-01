package golance

/*
 Add performs an addition of two integers
 Params:
   - a: The first integer
   - b: The second integer
 Returns:
   - int: The sum of a and b
*/
func Add(a int, b int) int {
	return a + b
}

/*
 Multiply multiplies two numbers
 Params:
   - x: The first number
   - y: The second number
 Returns:
   - float64: The product of x and y
*/
func Multiply(x float64, y float64) float64 {
	return x * y
}

var result = Add(5, 3)
