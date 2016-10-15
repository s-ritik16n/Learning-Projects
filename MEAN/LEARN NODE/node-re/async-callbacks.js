/*
var result = database.query(SELECT * FROM HUGETABLE);
console.log("hello world");

Let's assume that the database query is really slow, that it has
to read an awful lot of rows, which takes several seconds.

The way we have written this code, the JavaScript interpreter of
Node.js first has to read the complete result set from the
database, and then it can execute the console.log() function.

If this piece of code actually was, say, PHP, it would work the
same way: read all the results at once, then execute the next line
of code. If this code would be part of a web page script, the user
would have to wait several seconds for the page to load.

However, in the execution model of PHP, this would not become a
"global" problem: the web server starts its own PHP process for
every HTTP request it receives. If one of these requests results
in the execution of a slow piece of code, it results in a slow
page load for this particular user, but other users requesting
other pages would not be affected.

The execution model of Node.js is different - there is only one
single process. If there is a slow database query somewhere in
this process, this affects the whole process - everything comes
to a halt until the slow query has finished.

To avoid this, JavaScript, and therefore Node.js, introduces the
concept of event-driven, asynchronous callbacks, by utilizing an
event loop.

We can understand this concept by analyzing a rewritten version
of our problematic code:

    database.query("SELECT * FROM hugetable", function(rows) {
        var result = rows;
    });
    console.log("Hello World");


Here, instead of expecting *database.query()* to directly
return a result to us, we pass it a second parameter, an anonymous
function.

In its previous form, our code was synchronous: *first*
do the database query, and only when this is done, *then*
write to the console.

Now, Node.js can handle the database request asynchronously.
Provided that *database.query()* is part of an asynchronous
library, this is what Node.js does: just as before, it takes the
query and sends it to the database. But instead of waiting for it
to be finished, it makes a mental note that says "When at some
point in the future the database server is done and sends the
result of the query, then I have to execute the anonymous function
that was passed to *database.query()*."

Then, it immediately executes *console.log()*, and
afterwards, it enters the event loop. Node.js continuously cycles
through this loop again and again whenever there is nothing else
to do, waiting for events. Events like, e.g., a slow database
query finally delivering its results.

This also explains why our HTTP server needs a function it can
call upon incoming requests - if Node.js would start the server
and then just pause, waiting for the next request, continuing
only when it arrives, that would be highly inefficent. If a second
user requests the server while it is still serving the first
request, that second request could only be answered after the first
one is done - as soon as you have more than a handful of HTTP
requests per second, this wouldn't work at all.

It's important to note that this asynchronous, single-threaded,
event-driven execution model isn't an infinitely scalable
performance unicorn with silver bullets attached. It is just one
of several models, and it has its limitations. One being that as
of now, Node.js is just one single process and it can run on only
one single CPU core. Personally, I find this model quite
approachable, because it allows you to write applications that have to
deal with concurrency in an efficient and relatively
straightforward manner.


*/


