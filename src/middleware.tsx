import { NextResponse } from 'next/server'      
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request:NextRequest) {
    console.log('middleware executed')
//   return NextResponse.redirect(new URL('/add-task', request.url))
    const authToken=request.cookies.get('tokenAcess')?.value
        
    const loggedInuserNotAccessPaths = request.nextUrl.pathname == '/login' || request.nextUrl.pathname =='/signup'

    if (loggedInuserNotAccessPaths){
        if (authToken){
            return NextResponse.redirect(new URL('/',request.url))
        }
    }else {
        // accessing secure route 
        if(!authToken){
            return NextResponse.redirect(new URL('/login',request.url))
        }else{
            


        }
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/signup','/login','/loan/:path*','/rdname/:path*','/shfndname/:path*'],
}