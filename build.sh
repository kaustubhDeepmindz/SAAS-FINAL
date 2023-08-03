# concurrently 'npx nest build auth-services' 'npx nest build payment-services' 'npx nest build manager-services' 'npx nest build billing-services'
x="concurrently"
y="nest start billing-services"

x+="'$y'"
echo $x