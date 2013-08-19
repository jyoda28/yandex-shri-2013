function findFactorials() {
	var limit = 40585;  // Лимит поиска 
	
	function factorials (arr) {	
		num = 0;
		arr = arr.toString();
		arr = arr.split('');	
		
		function factorial(n) {
			if (n == 0) {
				return 1;
			} else {
				z = 1;
				for	(q = 1; q <= n; q++) {
					z = z*q;
				}
				return z;
			}
		}	
		
		for(i=0; i < arr.length; i++) {
			ar = parseInt(arr[i]);
			nu = factorial(ar);
			num = num + nu;
		}	
		
		return num;
	}
	
	for (x=0; x <= limit; x++) {
		if (x == factorials(x)) {
			console.log(x);
		}
	}
}
findFactorials();