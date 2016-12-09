#include<iostream>
#include<stdio.h>
#include<string.h>
using namespace std;
bool findsub (int arr[], int n)
{
    int s = 0;
    int i, j;
    for (i = 0; i < n; i++)s+= arr[i];
    if (s%2 != 0)  return false;
    bool p[s/2+1][n+1];
    for (i = 0; i <= n; i++)p[0][i] = true;// initializing the first row as true
    for (i = 1; i <= s/2; i++)p[i][0] = false;   // initializing the first column as false
    for (i = 1; i <= s/2; i++)
     {
       for (j = 1; j <= n; j++)
       {
         p[i][j] = p[i][j-1];//if first j-1  elements have subset = sum i, then first j elements also have subset sum =i
         if (i >= arr[j-1])p[i][j] = p[i][j] || p[i - arr[j-1]][j-1];//dp reccurence
       }
     }
     return p[s/2][n];
}
int main()
{
  int n;cout<<"enter the number of elements\n";
  cin>>n;int arr[n];cout<<"enter all the elements";
  for(int i=0;i<n;i++)cin>>arr[i];
  if (findsub(arr, n))printf("TRUE");
  else printf("FALSE");
}
