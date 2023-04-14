namespace WebAPI.MockFactory.Tests.Data
{
    using System.Collections.Generic;
    using Domain.Models;

    public static class TestPositions
    {
        public static Position PositionA => new () { Title = "PositionA" };

        public static Position PositionB => new () { Title = "PositionB" };

        public static Position PositionC => new () { Title = "PositionC" };

        public static List<Position> AllPositions => new () { PositionA, PositionB, PositionC };
    }
}
